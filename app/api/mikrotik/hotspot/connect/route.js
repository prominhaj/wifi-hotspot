import axios from 'axios';
import { NextResponse } from 'next/server';

export const POST = async (req) => {
    const { username, password } = await req.json();
    const url = `${process.env.NEXT_PUBLIC_MIKROTIK_LOGIN_DNS_IP}/login?username=${username}&password=${password}`;

    try {
        const response = await axios.get(url);

        if (response.data.ok) {
            return NextResponse.json({
                success: true,
                message: 'Login successful'
            });
        } else {
            return NextResponse.json({
                success: false,
                message: 'Invalid credentials'
            });
        }
    } catch (error) {
        return NextResponse.json({
            status: 500,
            success: false,
            message: error.message
        });
    }
};
