import { RouterOSAPI } from 'node-routeros';

const connectToRouter = async (isConnected) => {
    const conn = new RouterOSAPI({
        host: process.env.MIKROTIK_HOST,
        user: process.env.MIKROTIK_USER,
        password: process.env.MIKROTIK_PASSWORD,
        port: process.env.MIKROTIK_PORT || 8728,
        timeout: 5
    });

    try {
        const connection = await conn.connect();

        // If the connection
        if (isConnected) {
            return connection?.connected;
        }

        return conn;
    } catch (error) {
        return {
            error: true,
            message: error.message
        };
    }
};

export default connectToRouter;
