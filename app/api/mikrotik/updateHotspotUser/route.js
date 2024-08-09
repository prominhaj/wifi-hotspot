import connectToRouter from '@/lib/mikrotik';
import { NextResponse } from 'next/server';

export const PUT = async (req) => {
    const { userId, username, password, profile, email } = await req.json();
    try {
        const conn = await connectToRouter();

        // Update the hotspot user
        const updateFields = [];
        if (username) updateFields.push(`=name=${username}`);
        if (password) updateFields.push(`=password=${password}`);
        if (email) updateFields.push(`=email=${email}`);
        if (profile) updateFields.push(`=profile=${profile}`);

        await conn.write('/ip/hotspot/user/set', [`=.id=${userId}`, ...updateFields]);

        conn.close();

        return NextResponse.json({ success: true, message: 'User updated successfully' });
    } catch (error) {
        return NextResponse.json({
            success: false,
            error: error.message
        });
    }
};
