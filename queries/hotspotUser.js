import HotspotUser from '@/modals/hotspot-user-modal';

export const createHotspotUser = async (data) => {
    try {
        const createdHotspotUser = await HotspotUser.create(data);
        return {
            success: true,
            hotspotUser: createdHotspotUser
        };
    } catch (error) {
        throw new Error(error);
    }
};

export const updateHotspotUser = async (userId, updateIfo) => {
    try {
        const updatedHotspotUser = await HotspotUser.updateOne(
            {
                userId
            },
            updateIfo
        ).lean();
        return {
            success: true,
            hotspotUser: updatedHotspotUser
        };
    } catch (error) {
        throw new Error(error);
    }
};
