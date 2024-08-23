'use server';
import connectToRouter from '@/lib/mikrotik';

export const createProfileInMikrotik = async (data) => {
    const conn = await connectToRouter();
    try {
        const response = await conn.write('/ip/hotspot/user/profile/add', [
            `=name=${data.name}`,
            `=rate-limit=${data.rate_limit}`
        ]);
        return response;
    } catch (error) {
        throw new Error(error);
    }
};
