import connectToRouter from '@/lib/mikrotik';

export const getHotspotActiveUsers = async (length) => {
    const conn = await connectToRouter();

    try {
        const users = await conn.write('/ip/hotspot/active/print');
        return length ? users?.length : users;
    } catch (error) {
        throw new Error(`Failed to fetch active users: ${error.message}`);
    }
};

export const getHotspotUsers = async (length) => {
    const conn = await connectToRouter();

    try {
        const users = await conn.write('/ip/hotspot/user/print');
        return length ? users?.length : users;
    } catch (error) {
        throw new Error(`Failed to fetch Hotspot users: ${error.message}`);
    }
};
