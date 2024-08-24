'use server';

import { deleteActiveHotspotUser, deleteHotspotUser } from '@/lib/hotspot/apiAction/hotspot';
import { getHotspotActiveUserByPhone } from '@/lib/hotspot/dataFetching/hotspot';
import HotspotUser from '@/modals/hotspot-user-modal';

export const deletePermanentlyHotspotUser = async (hotspotUserId) => {
    try {
        const hotspotUser = await HotspotUser.findById(hotspotUserId).lean();
        // Remove the user from the MikroTik server
        const activeHotspotUser = await getHotspotActiveUserByPhone(hotspotUser?.username);

        if (activeHotspotUser?.success) {
            await deleteActiveHotspotUser(activeHotspotUser?.user['.id']);
        }

        const deletedResult = await deleteHotspotUser(user?.hotspotUserId);
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
