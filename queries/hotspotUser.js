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
