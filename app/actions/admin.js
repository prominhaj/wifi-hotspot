'use server';

import { deleteFile } from '@/lib/fileUploader';
import HotspotUser from '@/modals/hotspot-user-modal';
import MacAddress from '@/modals/mac-address-modal';
import User from '@/modals/user-modal';
import { getHotspotUserByUsername } from '@/queries/mikrotik';
import { revalidatePath } from 'next/cache';

export const updateHotspotUsersMacAddress = async () => {
    try {
        // Fetch all no macAddress hotspot users
        const getDataBaseHotspotUsers = await HotspotUser.find({
            $or: [
                { macAddress: { $exists: false } },
                {
                    macAddress: ''
                }
            ]
        }).lean();

        for (const databaseHotspotUser of getDataBaseHotspotUsers) {
            const hotspotUser = await getHotspotUserByUsername(databaseHotspotUser?.username, true);
            const macAddress = hotspotUser?.['mac-address'];

            // Update the Hotspot user set macAddress in the database
            if (macAddress) {
                await HotspotUser.updateOne(
                    {
                        _id: databaseHotspotUser._id,
                        status: 'active'
                    },
                    {
                        macAddress
                    }
                );

                // update macAddress in this connection
                const existingMacAddress = await MacAddress.exists({ macAddress });
                if (!existingMacAddress) {
                    await MacAddress.create({
                        hotspotUserId: databaseHotspotUser._id,
                        userId: databaseHotspotUser?.userId,
                        macAddress
                    });
                }
            }
        }

        // revalidatePath
        revalidatePath('/');

        return {
            success: true,
            message: 'Update MacAddress Successfully'
        };
    } catch (error) {
        throw new Error(error);
    }
};

export const userPhotoDelete = async (userId, publicId) => {
    try {
        const deleted = await deleteFile(publicId);
        if (deleted.result === 'ok') {
            await User.findByIdAndUpdate(userId, { profilePhoto: null });

            revalidatePath('/');

            return {
                success: true,
                message: 'User profile photo deleted successfully'
            };
        }
    } catch (error) {
        throw new Error(error);
    }
};
