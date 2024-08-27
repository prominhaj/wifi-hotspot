'use server';

import HotspotUser from '@/modals/hotspot-user-modal';
import { getHotspotUserByUsername } from '@/queries/mikrotik';
import { revalidatePath } from 'next/cache';

export const updateHotspotUsersMacAddress = async () => {
    try {
        // Fetch all no macAddress hotspot users
        const getDataBaseHotspotUsers = await HotspotUser.find({
            $or: [{ macAddress: { $exists: false } }, { macAddress: null }]
        }).lean();

        for (const databaseHotspotUser of getDataBaseHotspotUsers) {
            const hotspotUser = await getHotspotUserByUsername(databaseHotspotUser?.username);
            const macAddress = hotspotUser?.['mac-address'];
            // Update the Hotspot user set macAddress in the database
            if (macAddress) {
                await HotspotUser.findByIdAndUpdate(databaseHotspotUser._id, {
                    macAddress
                });
            }
        }

        // revalidatePath
        revalidatePath('/');

        return {
            success: true,
            message: 'Hotspot users macAddress updated successfully'
        };
    } catch (error) {
        throw new Error(error);
    }
};
