import { NextResponse } from 'next/server';

export const POST = async (req) => {
    const { username, password } = await req.json();
    console.log(username, password);

    const url = `${process.env.NEXT_PUBLIC_MIKROTIK_LOGIN_DNS_IP}/login?username=${username}&password=${password}`;

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        if (response.ok) {
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
        return NextResponse.error({
            status: 500,
            body: JSON.stringify({ error: error.message })
        });
    }
};
