import { getSessionUser } from '@/lib/dal';
import ProfileSection from '../_components/DashboardPage/ProfileSection';
import ActivePackageSection from '../_components/DashboardPage/ActivePackageSection';
import { getHotspotUserById } from '@/queries/hotspotUser';
import {
    getHotspotActiveUserByPhone,
    getHotspotUserByPhone
} from '@/lib/hotspot/dataFetching/hotspot';

const ActiveDashboard = async () => {
    const user = await getSessionUser();
    const [hotspotUser, activeHotspotUser, currentPlan] = await Promise.all([
        getHotspotUserByPhone(user?.phone),
        getHotspotActiveUserByPhone(user?.phone),
        getHotspotUserById(user?.id)
    ]);

    return (
        <div className='relative'>
            <ProfileSection
                isActiveHotspotUser={activeHotspotUser?.success}
                packageInfo={currentPlan}
                user={user}
                isActive={currentPlan?.status === 'active' ? true : false}
            />
            <ActivePackageSection
                isActive={currentPlan?.status === 'active' ? true : false}
                activeHotspotUser={activeHotspotUser}
                hotspotUser={hotspotUser}
                packageInfo={currentPlan}
            />
        </div>
    );
};

export default ActiveDashboard;
