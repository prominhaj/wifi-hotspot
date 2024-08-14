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

        if (results[0]?.ret) {
            await autoLoginUser(username, password);
        }

        conn.close();

        return { success: true, results };
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

// Function to perform auto-login
async function autoLoginUser(username, password) {
    try {
        const loginURL = `http://10.5.50.1/login`;

        const response = await axios.post(
            loginURL,
            new URLSearchParams({
                username: username,
                password: password
            }),
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
        );

        if (response.data.includes('Login successful')) {
            return { message: 'Login successful' };
        } else {
            return { error: 'Login failed' };
        }
    } catch (error) {
        console.error('Login Error:', error);
        return { error: 'Failed to login' };
    }
}
