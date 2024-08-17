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
    const [hotspotUser, activeHotspotUser, packages] = await Promise.all([
        getHotspotUserByPhone(user?.phone),
        getHotspotActiveUserByPhone(user?.phone),
        getHotspotUserById(user?.id)
    ]);

    return (
        <div className='relative'>
            <ProfileSection
                packageInfo={packages}
                user={user}
                isActive={packages?.status === 'active' ? true : false}
            />
            <ActivePackageSection
                isActive={packages?.status === 'active' ? true : false}
                activeHotspotUser={activeHotspotUser}
                hotspotUser={hotspotUser}
                packages={packages}
            />
        </div>
    );
};

export default ActiveDashboard;
