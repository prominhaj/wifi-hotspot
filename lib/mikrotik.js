import { RouterOSAPI } from 'node-routeros';

let connInstance = null; // Singleton instance

const connectToRouter = async (isConnected = false) => {
    if (connInstance && connInstance.connected) {
        // If already connected, return the existing connection
        if (isConnected) {
            return connInstance.connected;
        }
        return connInstance;
    }

    // Initialize the connection parameters
    const conn = new RouterOSAPI({
        host: process.env.MIKROTIK_HOST,
        user: process.env.MIKROTIK_USER,
        password: process.env.MIKROTIK_PASSWORD,
        port: process.env.MIKROTIK_PORT || 8728,
        timeout: 10,
        useTLS: false // Set to true if you're using a secure WebSocket
    });

    try {
        // Establish the connection
        await conn.connect();

        // Store the connection instance
        connInstance = conn;

        // Return the status if only the connection status is required
        if (isConnected) {
            return connInstance?.connected;
        }

        return connInstance;
    } catch (error) {
        // Reset the instance if connection fails
        connInstance = null;
        return {
            error: true,
            message: error.message
        };
    }
};

// Disconnect when the application closes to prevent hanging connections
// process.on('exit', () => {
//     if (connInstance) {
//         connInstance.close();
//     }
// });

export default connectToRouter;
