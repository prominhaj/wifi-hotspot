'use server';
import connectToRouter from '@/lib/mikrotik';
import { RouterOSAPI } from 'node-routeros';

export const createNewUser = async (formData) => {
    try {
        const username = formData.get('username');
        const password = formData.get('password');
        const profile = '7-Days';

        const conn = await connectToRouter();
        const results = await conn.write('/ip/hotspot/user/add', [
            `=name=${username}`,
            `=password=${password}`,
            `=profile=${profile}`,
            `=server=hotspot1`,
            `=email=hellobello@gmail.com`
        ]);

        // Automatically log in the user after creation
        const loginResponse = await conn.write('/ip/hotspot/active/login', [
            `=user=${username}`,
            `=password=${password}`
        ]);

        conn.close();

        console.log(results, loginResponse);

        return { success: true, results, loginResponse };
    } catch (error) {
        throw new Error(error);
    }
};

export const connectRouter = async ({ ip, user, password, port }) => {
    const conn = new RouterOSAPI({
        host: ip,
        user,
        password,
        port: port || 8728
    });

    try {
        const { connected } = await conn.connect();

        return {
            success: connected,
            message: 'Connected to MikroTik router'
        };
    } catch (error) {
        console.error('Failed to connect to MikroTik:', error);
        throw new Error(error);
    }
};
