import connectToRouter from '@/lib/mikrotik';
import { NextResponse } from 'next/server';

export const GET = async (_req) => {
    try {
        const conn = await connectToRouter();

        // Fetch all hotspot users
        const users = await conn.write('/ip/hotspot/user/print');

        return NextResponse.json({ success: true, users });
    } catch (error) {
        return NextResponse.json({ error: true, message: error.message });
    }
};
