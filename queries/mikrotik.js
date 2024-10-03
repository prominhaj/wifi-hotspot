import connectToRouter from '@/lib/mikrotik';

export const getHotspotActiveUsers = async (length) => {
    const conn = await connectToRouter();
    try {
        const users = await conn.write('/ip/hotspot/active/print');
        return length ? users?.length : users;
    } catch (error) {
        throw new Error(`Failed to fetch active users: ${error.message}`);
    } finally {
        conn.close();
    }
};

export const getHotspotActionById = async (userName) => {
    try {
        const conn = await connectToRouter();
        if (conn?.error) {
            return {
                success: false,
                connection: false,
                message: conn?.message
            };
        }

        const [user] = await conn.write('/ip/hotspot/active/print', [`?user=${userName}`]);
        conn.close();

        if (user) {
            return {
                success: true,
                user
            };
        }
        return {
            success: false
        };
    } catch (error) {
        throw new Error(error);
    }
};

export const getHotspotUsers = async (length) => {
    try {
        const conn = await connectToRouter();
        const users = await conn.write('/ip/hotspot/user/print');
        conn.close();

        return length ? users?.length : users;
    } catch (error) {
        throw new Error(`Failed to fetch Hotspot users: ${error.message}`);
    }
};

export const getHotspotUserByUsername = async (username) => {
    try {
        // Fetch user data by ID
        const conn = await connectToRouter();
        const [user] = await conn.write('/ip/hotspot/user/print', [`?name=${username}`]);
        conn.close();

        return user;
    } catch (error) {
        throw new Error(`Failed to fetch user by username: ${error.message}`);
    }
};

export const getHotspotProfileById = async (id) => {
    try {
        const conn = await connectToRouter();
        const profile = await conn.write('/ip/hotspot/user/profile/print', [`?.id=${id}`]);
        conn.close();

        return profile;
    } catch (error) {
        throw new Error(`Failed to fetch Hotspot profile: ${error.message}`);
    }
};
export const getHotspotProfiles = async () => {
    try {
        const conn = await connectToRouter();
        const profiles = await conn.write('/ip/hotspot/user/profile/print');
        conn.close();

        return profiles;
    } catch (error) {
        throw new Error(`Failed to fetch Hotspot profile: ${error.message}`);
    }
};

export const getHotspotServerProfile = async () => {
    try {
        const conn = await connectToRouter();
        const serverProfile = await conn.write('/ip/hotspot/print');
        conn.close();

        return serverProfile;
    } catch (error) {
        throw new Error(`Failed to fetch Hotspot Server profile: ${error.message}`);
    }
};
