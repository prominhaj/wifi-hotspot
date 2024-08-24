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

export const getHotspotActionById = async (userName) => {
    const conn = await connectToRouter();
    try {
        const [user] = await conn.write('/ip/hotspot/active/print', [`?user=${userName}`]);
        return user;
    } catch (error) {
        throw new Error(error);
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

export const getHotspotProfile = async () => {
    const conn = await connectToRouter();

    try {
        const profiles = await conn.write('/ip/hotspot/user/profile/print');
        return profiles;
    } catch (error) {
        throw new Error(`Failed to fetch Hotspot profile: ${error.message}`);
    }
};

export const getHotspotServerProfile = async () => {
    const conn = await connectToRouter();

    try {
        const serverProfile = await conn.write('/ip/hotspot/print');
        return serverProfile;
    } catch (error) {
        throw new Error(`Failed to fetch Hotspot Server profile: ${error.message}`);
    }
};
