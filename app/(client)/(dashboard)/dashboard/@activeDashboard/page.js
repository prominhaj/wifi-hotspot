import { getSessionUser } from '@/lib/dal';
import ProfileSection from '../_components/DashboardPage/ProfileSection';
import ActivePackageSection from '../_components/DashboardPage/ActivePackageSection';
import { getHotspotUserById } from '@/queries/hotspotUser';
import { getHotspotActiveUserByPhone, getHotspotUserByPhone } from '@/lib/dataFetching/hotspot';

const ActiveDashboard = async () => {
    const user = await getSessionUser();
    const [hotspotUser, activeHotspotUser, packages] = await Promise.all([
        getHotspotUserByPhone(user?.phone),
        getHotspotActiveUserByPhone(user?.phone),
        getHotspotUserById(user?.id)
    ]);
    // const hotspotUser = await getHotspotUserByPhone(user?.phone);
    // const activeHotspotUser = await getHotspotActiveUserByPhone(user?.phone);
    // const packages = await getHotspotUserById(user?.id);

    return (
        <div className='relative'>
            <ProfileSection packageInfo={packages} user={user} isActive={hotspotUser?.success} />
            <ActivePackageSection
                isActive={hotspotUser?.success}
                activeHotspotUser={activeHotspotUser}
                hotspotUser={hotspotUser}
            />
        </div>
    );
};

export default ActiveDashboard;
