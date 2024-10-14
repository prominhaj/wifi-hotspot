
import { Suspense } from 'react';
import ActivePackageSectionLoading from '../ActivePackageSection/ActivePackageSectionLoading';
import ProfileSection from '../ProfileSection/ProfileSection';
import ActivePackageSection from '../ActivePackageSection/ActivePackageSection';
import ProfileSectionLoading from '../ProfileSection/ProfileSectionLoading';

const ActiveDashboard = async () => {
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
