import BreadcrumbSection from '@/components/globals/Breadcrumb/BreadcrumbSection';
import CreateAddPackageForm from '../../_components/CreateAddPackageForm';
import { getHotspotServerProfile } from '@/queries/mikrotik';
import { getPackageById } from '@/queries/package';

// MetaData
export const metadata = {
    title: 'Edit Package - Wifi Hotspot',
    description: 'Explore || Add || Build || Share'
};

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
        label: 'Edit',
        current: true
    }
];

const PackageEditPage = async ({ params: { id } }) => {
    const getPackage = await getPackageById(id);
    const serverProfile = await getHotspotServerProfile();
    const modifiedServerProfile = serverProfile?.map((server) => {
        return {
            name: server.name
        };
    });

    const modifiedPackages = getPackage.map((item) => ({
        ...item,
        price: item?.price.toString(),
        validity: item?.validity.toString(),
        desktopPrice: item?.desktopPrice.toString(),
        discountPercentage: item?.discountPercentage.toString()
    }));

    return (
        <div>
            <BreadcrumbSection items={items} />
            <div className='flex items-center justify-center max-w-5xl p-6 mx-auto mt-5 rounded-lg md:mt-16'>
                <div className='w-full max-w-full bg-background/10'>
                    <CreateAddPackageForm
                        defaultValueData={modifiedPackages}
                        serverProfile={modifiedServerProfile}
                        isEditing={true}
                    />
                </div>
            </div>
        </div>
    );
};

export default PackageEditPage;
