'use server';

import { deleteActiveHotspotUser, deleteHotspotUser } from '@/lib/hotspot/apiAction/hotspot';
import {
    getHotspotActiveUserByPhone,
    getHotspotUserByPhone
} from '@/lib/hotspot/dataFetching/hotspot';
import connectToRouter from '@/lib/mikrotik';
import HotspotUser from '@/modals/hotspot-user-modal';
import Package from '@/modals/package-modal';
import User from '@/modals/user-modal';

export const updateHotspotUserById = async (id, hotspotId, updateInfo) => {
    try {
        const conn = await connectToRouter();

        if (conn?.error) {
            return {
                success: false,
                message: conn.message
            };
        }

        // Update the hotspot user with the provided username, password, and mac-address

        console.log(updateInfo?.macAddress);

        await conn.write('/ip/hotspot/user/set', [
            `=.id=${hotspotId}`,
            `=name=${updateInfo?.username}`,
            `=password=${updateInfo?.password}`
        ]);

        // Update the user's information in the database
        await HotspotUser.findByIdAndUpdate(id, updateInfo);

        return {
            success: true,
            message: 'Hotspot User updated successfully'
        };
    } catch (error) {
        throw new Error(error);
    }
};

export const deletePermanentlyHotspotUser = async (hotspotUserId) => {
    try {
        const hotspotUser = await HotspotUser.findById(hotspotUserId).lean();
        // Remove the user from the MikroTik server
        const activeHotspotUser = await getHotspotActiveUserByPhone(hotspotUser?.username);

        if (activeHotspotUser?.success) {
            await deleteActiveHotspotUser(activeHotspotUser?.user['.id']);
        }

        const deletedResult = await deleteHotspotUser(hotspotUser?.hotspotUserId);
        if (deletedResult?.success) {
            // Delete the user from the DB
            await HotspotUser.findByIdAndDelete(hotspotUserId);
        }

        return {
            success: true,
            message: 'User deleted permanently successfully'
        };
    } catch (error) {
        throw new Error(error);
    }
};

export const recoverHotspotUsers = async () => {
    try {
        const activeHotspotUsers = await HotspotUser.find({
            status: 'active'
        })
            .populate({
                path: 'packageId',
                model: Package
            })
            .populate({
                path: 'userId',
                model: User
            })
            .lean();

        for (const activeHotspotUser of activeHotspotUsers) {
            const findHotspotUser = await getHotspotUserByPhone(activeHotspotUser?.username);
            if (!findHotspotUser?.success) {
                const conn = await connectToRouter();

                if (conn?.error) {
                    return {
                        success: false,
                        message: conn?.message
                    };
                }

                const createdUser = await conn.write('/ip/hotspot/user/add', [
                    `=name=${activeHotspotUser?.username}`,
                    `=password=${activeHotspotUser?.password}`,
                    `=profile=${activeHotspotUser?.packageId?.profileName}`,
                    `=server=${activeHotspotUser?.packageId?.hotspotServer || 'hotspot1'}`,
                    `=comment=${activeHotspotUser?.userId?.name}`
                ]);
                if (createdUser[0]?.ret) {
                    await HotspotUser.findByIdAndUpdate(activeHotspotUser._id, {
                        hotspotUserId: createdUser[0]?.ret
                    });
                }
            }
        }

        return {
            success: true,
            message: 'Users recovered successfully'
        };
    } catch (error) {
        throw new Error(error);
    }
};
