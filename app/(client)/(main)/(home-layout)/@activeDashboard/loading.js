import ActivePackageSectionLoading from './_components/ActivePackageSection/ActivePackageSectionLoading';
import ProfileSectionLoading from './_components/ProfileSection/ProfileSectionLoading';

const ActiveDashboardLoading = () => {
    return (
        <div className='relative'>
            <ProfileSectionLoading />
            <ActivePackageSectionLoading />
        </div>
    );
};

export default ActiveDashboardLoading;
