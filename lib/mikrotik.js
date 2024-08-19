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
        const connected = await conn.connect();

        console.log(connected);

        return conn;
    } catch (error) {
        throw new Error(error);
    }
};

export default connectToRouter;
