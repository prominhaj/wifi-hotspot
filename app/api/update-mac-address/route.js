import HotspotUser from '@/modals/hotspot-user-modal';
import MacAddress from '@/modals/mac-address-modal';
import { getHotspotUserByUsername } from '@/queries/mikrotik';
import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

export const GET = async (_req) => {
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
            const hotspotUser = await getHotspotUserByUsername(databaseHotspotUser?.username);
            const macAddress = hotspotUser?.['mac-address'];
            // Update the Hotspot user set macAddress in the database
            if (macAddress) {
                await HotspotUser.findByIdAndUpdate(databaseHotspotUser._id, {
                    macAddress
                });

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

        return NextResponse.json({
            success: true,
            message: 'Hotspot users macAddress updated successfully'
        });
    } catch (error) {
        return NextResponse.json({
            success: false,
            error: error.message
        });
    }
};
