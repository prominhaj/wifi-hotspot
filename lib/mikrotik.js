import { RouterOSAPI } from 'node-routeros';

let connInstance = null; // Singleton instance

const connectToRouter = async (isConnected = false) => {
    if (connInstance && connInstance.connected) {
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
<<<<<<< HEAD
        timeout: 10,
=======
        timeout: 30,
        useTLS: false
>>>>>>> 5c3c15d6f0cea59e25a744cbcf4d99811c63f37b
    });

    try {
        // Attempt to connect
        await conn.connect();
        connInstance = conn;
        connInstance.setMaxListeners(20);

        if (!connInstance?.connected) {
            throw new Error('Connection failed to router');
        }

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

// Disconnect properly when the application closes
process.on('exit', () => {
    if (connInstance) {
        connInstance.close();
    }
});

export default connectToRouter;
