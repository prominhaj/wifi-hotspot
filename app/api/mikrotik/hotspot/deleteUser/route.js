import connectToRouter from '@/lib/mikrotik';
import { NextResponse } from 'next/server';

export const DELETE = async (req) => {
    const searchParams = req.nextUrl.searchParams;
    const userId = searchParams.get('userId');

    try {
        const conn = await connectToRouter();

        // Delete the hotspot user
        await conn.write('/ip/hotspot/user/remove', [`=.id=${userId}`]);

        return NextResponse.json({ success: true, message: 'User deleted successfully' });
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message });
    }
};
