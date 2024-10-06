import { getSessionUser } from '@/lib/dal';
import { getHotspotUserByUserId } from '@/queries/hotspotUser';
import { Suspense } from 'react';
import ActivePackageSectionLoading from '../ActivePackageSection/ActivePackageSectionLoading';
import ProfileSection from '../ProfileSection/ProfileSection';
import ActivePackageSection from '../ActivePackageSection/ActivePackageSection';
import ProfileSectionLoading from '../ProfileSection/ProfileSectionLoading';

const ActiveDashboard = async () => {
    const user = await getSessionUser();
    const currentPlan = JSON.parse(await getHotspotUserByUserId(user?.id));
    const currentStatus = currentPlan?.status === 'active' ? true : false;

    return (
        <>
            <div className='relative'>
                <Suspense fallback={<ProfileSectionLoading />}>
                    <ProfileSection />
                </Suspense>
                <Suspense fallback={<ActivePackageSectionLoading />}>
                    <ActivePackageSection />
                </Suspense>
            </div>
        </>
    );
};

export default ActiveDashboard;
