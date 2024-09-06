import { getSessionUser } from '@/lib/dal';
import ProfileSection from './_components/ProfileSection/ProfileSection';
import ActivePackageSection from './_components/ActivePackageSection/ActivePackageSection';
import { getHotspotUserByUserId } from '@/queries/hotspotUser';
import {
    getHotspotActiveUserByPhone,
    getHotspotUserByPhone
} from '@/lib/hotspot/dataFetching/hotspot';
import { Suspense } from 'react';
import ActivePackageSectionLoading from './_components/ActivePackageSection/ActivePackageSectionLoading';

const ActiveDashboard = async () => {
    const user = await getSessionUser();

    const currentPlan = await getHotspotUserByUserId(user?.id);
    const currentStatus = currentPlan?.status === 'active' ? true : false;

    const hotspotUser = currentStatus && (await getHotspotUserByPhone(user?.phone));
    const activeHotspotUser = currentStatus && (await getHotspotActiveUserByPhone(user?.phone));

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
                <Suspense fallback={<ActivePackageSectionLoading />}>
                    <ActivePackageSection
                        isActive={currentStatus}
                        activeHotspotUser={activeHotspotUser}
                        hotspotUser={hotspotUser}
                        packageInfo={currentPlan}
                    />
                </Suspense>
            </div>
        </>
    );
};

export default ActiveDashboard;
