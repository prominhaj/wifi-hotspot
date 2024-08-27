import BreadcrumbSection from '@/components/globals/Breadcrumb/BreadcrumbSection';
import CreateAddPackageForm from '../_components/CreateAddPackageForm';
import { getHotspotServerProfile } from '@/queries/mikrotik';

// MetaData
export const metadata = {
    title: 'Add Package - Wifi Hotspot',
    description: 'Explore || Add || Build || Share'
};

export const dynamic = "force-dynamic";

const items = [
    {
        label: 'Dashboard',
        href: '/dashboard'
    },
    {
        label: 'Packages',
        href: '/dashboard/packages'
    },
    {
        label: 'Add',
        current: true
    }
];

const PackagesAddPage = async () => {
    const serverProfile = await getHotspotServerProfile();
    const modifiedServerProfile = serverProfile?.map((server) => {
        return {
            name: server.name
        };
    });

    return (
        <div>
            <BreadcrumbSection items={items} />
            <div className='flex items-center justify-center max-w-5xl p-6 mx-auto mt-5 rounded-lg md:mt-16'>
                <div className='w-full max-w-full bg-background/10'>
                    <CreateAddPackageForm serverProfile={modifiedServerProfile} />
                </div>
            </div>
        </div>
    );
};

export default PackagesAddPage;
