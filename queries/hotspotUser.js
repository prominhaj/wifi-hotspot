import { replaceMongoIdInObject } from '@/lib/convertData';
import HotspotUser from '@/modals/hotspot-user-modal';
import Package from '@/modals/package-modal';
import Payment from '@/modals/payment-modal';

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

export const getHotspotUserById = async (userId) => {
    try {
        const hotspotUser = await HotspotUser.findOne({
            userId,
            status: 'active'
        })
            .populate({
                path: 'packageId',
                model: Package
            })
            .populate({
                path: 'paymentId',
                model: Payment
            })
            .lean();
        return replaceMongoIdInObject(hotspotUser);
    } catch (error) {
        throw new Error(error);
    }
};

export const updateHotspotUser = async (hotspotUserId, updateIfo) => {
    try {
        const updatedHotspotUser = await HotspotUser.updateOne(
            {
                hotspotUserId
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
