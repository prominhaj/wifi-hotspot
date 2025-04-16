import { RouterOSAPI } from "node-routeros";
import { getMikrotikConfig } from "@/queries/config";
import { invalidateCache } from "@/utils/mikrotik-cache";

let connInstance = null;
let connectionAttempts = 0;
const MAX_RETRY_ATTEMPTS = 3;
const RETRY_DELAY = 2000; // 2 seconds

// Connection status events
const connectionListeners = new Set();

// Connection status
export const CONNECTION_STATUS = {
  DISCONNECTED: "disconnected",
  CONNECTING: "connecting",
  CONNECTED: "connected",
  ERROR: "error",
};

let currentStatus = CONNECTION_STATUS.DISCONNECTED;

// Update connection status and notify listeners
const updateConnectionStatus = (status, errorMessage = null) => {
  currentStatus = status;
  connectionListeners.forEach((listener) => {
    listener(status, errorMessage);
  });
};

// Subscribe to connection status changes
export const onConnectionStatusChange = (callback) => {
  connectionListeners.add(callback);
  // Return unsubscribe function
  return () => {
    connectionListeners.delete(callback);
  };
};

// Get current connection status
export const getConnectionStatus = () => {
  return currentStatus;
};

const connectToRouter = async (
  options = { forceRefresh: false, retry: true, isConnected: false }
) => {
  // Handle both boolean parameter (for backward compatibility) and options object
  const {
    forceRefresh = false,
    retry = true,
    isConnected = false,
  } = typeof options === "boolean"
    ? { forceRefresh: false, retry: true, isConnected: options }
    : options;

  // Update status to connecting
  updateConnectionStatus(CONNECTION_STATUS.CONNECTING);

  // If we already have a valid connection, return it
  if (connInstance && connInstance.connected) {
    updateConnectionStatus(CONNECTION_STATUS.CONNECTED);
    if (isConnected) {
      return connInstance.connected;
    }
    return connInstance;
  }

  // Fetch the configuration from the database (with cache)
  const config = await getMikrotikConfig(forceRefresh);
  if (config.error) {
    updateConnectionStatus(CONNECTION_STATUS.ERROR, config.message);
    return {
      error: true,
      message: config.message,
    };
  }

  const conn = new RouterOSAPI({
    host: config?.host,
    user: config?.user,
    password: config?.password,
    port: config?.port || 8728,
    timeout: config?.timeout || 30,
    useTLS: config?.useTLS || false,
  });

  try {
    // Attempt to connect
    await conn.connect();
    connInstance = conn;
    connInstance.setMaxListeners(20);

    // Setup keepalive if configured
    if (config.keepalive) {
      setupKeepAlive(connInstance);
    }

    // Reset connection attempts on successful connection
    connectionAttempts = 0;

    if (!connInstance?.connected) {
      throw new Error("Connection failed to router");
    }

    // Update status to connected
    updateConnectionStatus(CONNECTION_STATUS.CONNECTED);

    if (isConnected) {
      return connInstance?.connected;
    }

    return connInstance;
  } catch (error) {
    // Invalidate cache on connection error
    invalidateCache();

    // Increment connection attempts
    connectionAttempts++;

    // Update status to error
    updateConnectionStatus(CONNECTION_STATUS.ERROR, error.message);

    // If we should retry and haven't exceeded max attempts
    if (retry && connectionAttempts < MAX_RETRY_ATTEMPTS) {
      console.log(
        `Connection attempt ${connectionAttempts} failed. Retrying in ${RETRY_DELAY}ms...`
      );

      // Wait before retrying
      await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY));

      // Try again with fresh config
      return connectToRouter({ forceRefresh: true, retry: true, isConnected });
    }

    // Reset connection instance
    connInstance = null;

    return {
      error: true,
      message: error.message,
      attempts: connectionAttempts,
    };
  }
};

// Setup keepalive ping
function setupKeepAlive(conn, interval = 30000) {
  const keepAliveInterval = setInterval(async () => {
    if (conn && conn.connected) {
      try {
        // Simple command to keep connection alive
        await conn.write("/system/identity/print");
      } catch (error) {
        console.error("Keepalive failed:", error);
        clearInterval(keepAliveInterval);

        // Try to reconnect
        connInstance = null;
        connectToRouter({ forceRefresh: true });
      }
    } else {
      clearInterval(keepAliveInterval);
    }
  }, interval);

  // Store interval reference for cleanup
  conn.keepAliveInterval = keepAliveInterval;
}

// Disconnect properly when the application closes
process.on("exit", () => {
  if (connInstance) {
    if (connInstance.keepAliveInterval) {
      clearInterval(connInstance.keepAliveInterval);
    }
    connInstance.close();
    updateConnectionStatus(CONNECTION_STATUS.DISCONNECTED);
  }
});

// Function to manually reconnect
export const reconnect = async () => {
  // Close existing connection if any
  if (connInstance) {
    if (connInstance.keepAliveInterval) {
      clearInterval(connInstance.keepAliveInterval);
    }

    if (connInstance.connected) {
      try {
        await connInstance.close();
      } catch (error) {
        console.error("Error closing connection:", error);
      }
    }
  }

  // Reset connection instance and attempts
  connInstance = null;
  connectionAttempts = 0;

  // Connect with fresh config
  return connectToRouter({ forceRefresh: true, retry: true });
};

export default connectToRouter;
