import { RouterOSAPI } from 'node-routeros';

const connectToRouter = async () => {
    const conn = new RouterOSAPI({
        host: process.env.MIKROTIK_HOST,
        user: process.env.MIKROTIK_USER,
        password: process.env.MIKROTIK_PASSWORD,
        port: process.env.MIKROTIK_PORT || 8728,
        timeout: 5
    });

    try {
        await conn.connect();
        return conn;
    } catch (error) {
        throw new Error(`Connection failed: ${error.message}`);
    }
};

export default connectToRouter;
