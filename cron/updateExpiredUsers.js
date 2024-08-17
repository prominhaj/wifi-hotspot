import { deleteActiveHotspotUser, deleteHotspotUser } from '@/lib/hotspot/apiAction/hotspot';
import { getHotspotActiveUserByPhone } from '@/lib/hotspot/dataFetching/hotspot';
import { dbConnect } from '@/lib/mongo';
import HotspotUser from '@/modals/hotspot-user-modal';

export const updateExpiredUsers = async () => {
    await dbConnect();

    const currentDate = new Date();

    try {
        // Find users whose expiredAt date is less than or equal to the current date and time
        const expiredUsers = await HotspotUser.find({
            expiredAt: { $lte: currentDate },
            status: 'active'
        }).lean();

        for (const user of expiredUsers) {
            // Update the user's status to 'expired'
            await HotspotUser.updateOne({ _id: user._id }, { $set: { status: 'expired' } });

            // Remove the user from the MikroTik server
            const activeHotspotUser = await getHotspotActiveUserByPhone(user?.username);
            if (activeHotspotUser?.success) {
                await deleteActiveHotspotUser(activeHotspotUser?.user['.id']);
            }

            await deleteHotspotUser(user?.hotspotUserId);
        }
    } catch (error) {
        console.error('Error updating expired users:', error);
    }
};
