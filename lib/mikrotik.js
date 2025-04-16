import { RouterOSAPI } from "node-routeros";
import { getMikrotikConfig } from "@/queries/config";
import { invalidateCache } from "@/utils/mikrotik-cache";

let connInstance = null;
let connectionAttempts = 0;
const MAX_RETRY_ATTEMPTS = 3;
const RETRY_DELAY = 2000; // 2 seconds

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

  // If we already have a valid connection, return it
  if (connInstance && connInstance.connected) {
    if (isConnected) {
      return connInstance.connected;
    }
    return connInstance;
  }

  // Fetch the configuration from the database (with cache)
  const config = await getMikrotikConfig(forceRefresh);
  if (config.error) {
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
    timeout: 30,
    useTLS: false,
  });

  try {
    // Attempt to connect
    await conn.connect();
    connInstance = conn;
    connInstance.setMaxListeners(20);

    // Reset connection attempts on successful connection
    connectionAttempts = 0;

    if (!connInstance?.connected) {
      throw new Error("Connection failed to router");
    }

    if (isConnected) {
      return connInstance?.connected;
    }

    return connInstance;
  } catch (error) {
    // Invalidate cache on connection error
    invalidateCache();

    // Increment connection attempts
    connectionAttempts++;

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

// Disconnect properly when the application closes
process.on("exit", () => {
  if (connInstance) {
    connInstance.close();
  }
});

// Function to manually reconnect
export const reconnect = async () => {
  // Close existing connection if any
  if (connInstance && connInstance.connected) {
    try {
      await connInstance.close();
    } catch (error) {
      console.error("Error closing connection:", error);
    }
  }

  // Reset connection instance and attempts
  connInstance = null;
  connectionAttempts = 0;

  // Connect with fresh config
  return connectToRouter({ forceRefresh: true, retry: true });
};

export default connectToRouter;
