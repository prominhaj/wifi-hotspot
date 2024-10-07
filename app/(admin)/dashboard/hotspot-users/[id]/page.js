import { getHotspotUserById } from '@/queries/hotspotUser';
import BreadcrumbSection from '@/components/globals/Breadcrumb/BreadcrumbSection';
import HotspotUserDetailsCard from './_components/HotspotUserDetailsCard';

export const generateMetadata = async ({ params: { id } }) => {
    const hotspotUser = JSON.parse(await getHotspotUserById(id));

    return {
        title: `${hotspotUser?.userId?.name} - Wifi Hotspot`,
        openGraph: {
            images: [hotspotUser?.userId?.profilePhoto?.url]
        }
    };
};

const HotspotUserDetailsPage = async ({ params: { id } }) => {
    const hotspotUser = JSON.parse(await getHotspotUserById(id));

    // items
    const items = [
        {
            label: 'Dashboard',
            href: '/dashboard'
        },
        {
            label: 'Hotspot Users',
            href: '/dashboard/hotspot-users'
        },
        {
            label: hotspotUser?.userId?.name,
            current: true
        }
    ];

    return (
        <>
            <BreadcrumbSection items={items} />
            <div className='px-6 py-3'>
                <HotspotUserDetailsCard hotspotUser={hotspotUser} />
            </div>
        </>
    );
};

export default HotspotUserDetailsPage;
