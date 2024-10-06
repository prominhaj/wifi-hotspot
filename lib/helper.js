import { getHotspotUserByUserId } from '@/queries/hotspotUser';
import { getSessionUser } from './dal';
import { getHotspotActiveUserByPhone, getHotspotUserByPhone } from './hotspot/dataFetching/hotspot';

export const userDashboardInfo = async () => {
    try {
        const user = await getSessionUser();
        const currentPlan = JSON.parse(await getHotspotUserByUserId(user?.id));
        const currentStatus = currentPlan?.status === 'active' ? true : false;

        const hotspotUser = currentStatus && (await getHotspotUserByPhone(user?.phone));
        const activeHotspotUser = currentStatus && (await getHotspotActiveUserByPhone(user?.phone));

        return {
            user,
            isActive: currentStatus,
            hotspotUser,
            activeHotspotUser,
            packageInfo: currentPlan
        };
    } catch (error) {
        throw new Error(error);
    }
};
