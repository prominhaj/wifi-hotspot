import User from '@/modals/user-modal';
import { NextResponse } from 'next/server';

export const GET = async (request) => {
    try {
        const searchParams = request.nextUrl.searchParams;
        const phone = searchParams.get('phone');
        const findPhone = await User.exists({ phone });

        if (findPhone) {
            return NextResponse.json({
                success: true,
                isValid: true
            });
        }
        return NextResponse.json({
            success: true,
            isValid: false
        });
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: error.message
        });
    }
};
