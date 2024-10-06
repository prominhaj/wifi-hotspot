import { replaceMongoIdInObject } from '@/lib/convertData';
import HotspotUser from '@/modals/hotspot-user-modal';
import Package from '@/modals/package-modal';
import Payment from '@/modals/payment-modal';
import User from '@/modals/user-modal';
import { getHotspotActiveUsers } from './mikrotik';

export const getHotspotUsers = async (filter) => {
    try {
        const hotspotUsers = await HotspotUser.find(filter)
            .populate({
                path: 'userId',
                model: User
            })
            .populate({
                path: 'packageId',
                model: Package
            })
            .populate({
                path: 'paymentId',
                model: Payment
            })
            .sort({ createdAt: -1 })
            .lean();
        return JSON.stringify(hotspotUsers);
    } catch (error) {
        throw new Error(error);
    }
};

export const getHotspotUserById = async (id) => {
    try {
        const hotspotUser = await HotspotUser.findById(id)
            .populate({
                path: 'userId',
                model: User
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

export const getActiveHotpotUsers = async () => {
    try {
        // Fetch all active hotspot users at once
        const activeHotspotUsers = await getHotspotActiveUsers();

        // Extract all the usernames we need to search for in a single database query
        const usernames = activeHotspotUsers.map((user) => user?.user);

        // Query the database once to find all matching users
        const hotspotUsers = await HotspotUser.find({
            username: { $in: usernames },
            status: 'active'
        })
            .populate({
                path: 'userId',
                model: User
            })
            .lean();

        // Create a map for fast lookups of hotspot users by username
        const hotspotUserMap = new Map(hotspotUsers.map((user) => [user.username, user]));

        // Prepare the modified users array
        const modifiedUsers = activeHotspotUsers
            .map((user) => {
                const hotspotUser = hotspotUserMap.get(user?.user);
                return hotspotUser
                    ? {
                          ...hotspotUser,
                          bytes_in: user?.['bytes-in'],
                          bytes_out: user?.['bytes-out']
                      }
                    : null;
            })
            .filter(Boolean);

        return JSON.stringify(modifiedUsers);
    } catch (error) {
        throw new Error(error);
    }
};

export const getHotspotUserByUserId = async (userId) => {
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
        return JSON.stringify(hotspotUser);
    } catch (error) {
        throw new Error(error);
    }
};

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

export const updateHotspotUserById = async (id, updateIfo) => {
    try {
        const updatedHotspotUser = await HotspotUser.findByIdAndUpdate(id, updateIfo);
        return {
            success: true,
            hotspotUser: updatedHotspotUser
        };
    } catch (error) {
        throw new Error(error);
    }
};

export const totalHotspotUsers = async () => {
    try {
        const totalHotspotUsers = await HotspotUser.countDocuments({ status: 'active' });
        return totalHotspotUsers;
    } catch (error) {
        throw new Error(error);
    }
};

export const totalExpiredHotspotUsers = async () => {
    try {
        const totalExpiredUsers = await HotspotUser.countDocuments({ status: 'expired' });
        return totalExpiredUsers;
    } catch (error) {
        throw new Error(error);
    }
};
