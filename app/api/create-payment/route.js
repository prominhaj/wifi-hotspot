import { NextResponse } from 'next/server';

export const GET = async (req) => {
    try {
    } catch (error) {
        return NextResponse.json({
            success: false,
            error: error.message
        });
    }
};
