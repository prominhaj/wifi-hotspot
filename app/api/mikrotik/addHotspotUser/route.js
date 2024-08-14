import connectToRouter from '@/lib/mikrotik';
import axios from 'axios';
import { NextResponse } from 'next/server';

export const POST = async (req) => {
    const { username, password } = await req.json();
    const profile = '7-Days';

    try {
        const conn = await connectToRouter();
        const results = await conn.write('/ip/hotspot/user/add', [
            `=name=${username}`,
            `=password=${password}`,
            `=profile=${profile}`,
            `=server=hotspot1`,
            `=email=hellobello@gmail.com`
        ]);

        // // Automatically log in the user after creation
        // const loginResponse = await conn.write('/ip/hotspot/active/login', [
        //     `=user=${username}`,
        //     `=password=${password}`
        // ]);

        const response = await axios.post('http://10.5.50.1/login', {
            username: username,
            password: password
        });

        if (response.data.includes('Login successful')) {
            conn.close();

            return NextResponse.json({ success: true, results });
        }
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message });
    }
};
