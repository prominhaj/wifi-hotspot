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

export const updateProfileInMikrotik = async (data) => {
    const conn = await connectToRouter();
    const { hotspotProfileId, name, rate_limit } = data;

    try {
        // Update the hotspot user
        const updateFields = [];
        if (name) updateFields.push(`=name=${name}`);
        if (rate_limit) updateFields.push(`=rate-limit=${rate_limit}`);

        const response = await conn.write('/ip/hotspot/user/profile/set', [
            `=.id=${hotspotProfileId}`,
            ...updateFields
        ]);

        return {
            success: true
        };
    } catch (error) {
        throw new Error(error);
    }
};
