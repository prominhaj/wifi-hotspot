import { RouterOSAPI } from 'node-routeros';

const connectToRouter = async () => {
    const conn = new RouterOSAPI({
        host: process.env.MIKROTIK_HOST,
        user: process.env.MIKROTIK_USER,
        password: process.env.MIKROTIK_PASSWORD,
        port: process.env.MIKROTIK_PORT || 7479
    });

    try {
        await conn.connect();
        return conn;
    } catch (error) {
        console.error('Failed to connect to MikroTik:', error);
        throw error;
    }
};

export default connectToRouter;
