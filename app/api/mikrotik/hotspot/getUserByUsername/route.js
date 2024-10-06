import connectToRouter from '@/lib/mikrotik';
import { NextResponse } from 'next/server';

export const GET = async (req) => {
    const searchParams = req.nextUrl.searchParams;
    const phone = searchParams.get('phone');

    try {
        const conn = await connectToRouter();
        if (conn?.error) {
            return NextResponse.json({
                success: false,
                message: conn?.message
            });
        }

        // Fetch user data by ID
        const [user] = await conn.write('/ip/hotspot/user/print', [`?name=${phone}`]);
        // conn.close();

        if (!user) {
            return NextResponse.json({ success: false, message: 'User not found' });
        }

        // Respond with the user data
        return NextResponse.json({ success: true, user });
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: error.message,
            error: error.stack
        });
    }
};
