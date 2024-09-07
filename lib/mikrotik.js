import { RouterOSAPI } from 'node-routeros';

let connInstance = null; // Singleton instance

const connectToRouter = async (isConnected) => {
    if (connInstance && connInstance.connected) {
        // If already connected, return the connection
        if (isConnected) {
            return connInstance.connected;
        }
        return connInstance;
    }

    const conn = new RouterOSAPI({
        host: process.env.MIKROTIK_HOST,
        user: process.env.MIKROTIK_USER,
        password: process.env.MIKROTIK_PASSWORD,
        port: process.env.MIKROTIK_PORT || 8728,
        timeout: 10
    });

    try {
        await conn.connect();

        connInstance = conn;

        if (isConnected) {
            return connInstance?.connected;
        }

        return connInstance;
    } catch (error) {
        connInstance = null;
        return {
            error: true,
            message: error.message
        };
    }
};

// Disconnect when application closes (optional)
process.on('exit', () => {
    if (connInstance) {
        connInstance.close();
    }
});

export default connectToRouter;
