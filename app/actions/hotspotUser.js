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

                await conn.write('/ip/hotspot/user/add', [
                    `=name=${activeHotspotUser?.username}`,
                    `=password=${activeHotspotUser?.password}`,
                    `=profile=${activeHotspotUser?.packageId?.profileName}`,
                    `=server=${activeHotspotUser?.packageId?.hotspotServer || 'hotspot1'}`,
                    `=comment=${activeHotspotUser?.userId?.name}`
                ]);
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
