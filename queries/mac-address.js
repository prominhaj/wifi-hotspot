import { replaceMongoIdInArray } from '@/lib/convertData';
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
            .lean();
        return replaceMongoIdInArray(macAddresses);
    } catch (error) {
        throw new Error(error);
    }
};
