import { getSessionUser } from '@/lib/dal';
import ProfileSection from './_components/ProfileSection/ProfileSection';
import ActivePackageSection from './_components/ActivePackageSection/ActivePackageSection';
import { getHotspotUserByUserId } from '@/queries/hotspotUser';
import {
    getHotspotActiveUserByPhone,
    getHotspotUserByPhone
} from '@/lib/hotspot/dataFetching/hotspot';

const ActiveDashboard = async () => {
    const user = await getSessionUser();

    const currentPlan = await getHotspotUserByUserId(user?.id);
    const currentStatus = currentPlan?.status === 'active' ? true : false;

    const hotspotUser = currentStatus && (await getHotspotUserByPhone(user?.phone));
    const activeHotspotUser = currentStatus && (await getHotspotActiveUserByPhone(user?.phone));

    console.log(hotspotUser);
    console.log(activeHotspotUser);

    return (
        <>
            <div className='relative'>
                <ProfileSection
                    hotspotUser={hotspotUser}
                    isActiveHotspotUser={activeHotspotUser?.success}
                    packageInfo={currentPlan}
                    user={user}
                    isActive={currentStatus}
                />
                <ActivePackageSection
                    isActive={currentStatus}
                    activeHotspotUser={activeHotspotUser}
                    hotspotUser={hotspotUser}
                    packageInfo={currentPlan}
                />
            </div>
        </>
    );
};

export default ActiveDashboard;