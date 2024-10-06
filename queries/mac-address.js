import HotspotUser from '@/modals/hotspot-user-modal';
import MacAddress from '@/modals/mac-address-modal';
import User from '@/modals/user-modal';

export const getMacAddresses = async () => {
    try {
        const macAddresses = await MacAddress.find()
            .populate({
                path: 'userId',
                model: User
            })
            .populate({
                path: 'hotspotUserId',
                model: HotspotUser
            })
            .sort({ createdAt: -1 })
            .lean();
        return JSON.stringify(macAddresses);
    } catch (error) {
        throw new Error(error);
    }
};
