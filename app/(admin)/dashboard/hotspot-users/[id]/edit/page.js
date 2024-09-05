import BreadcrumbSection from '@/components/globals/Breadcrumb/BreadcrumbSection';
import { getHotspotUserById } from '@/queries/hotspotUser';
import EditForm from '../../_components/EditPage/EditForm';

export const generateMetadata = async ({ params: { id } }) => {
    const editHotspotUser = await getHotspotUserById(id);

    return {
        title: `${editHotspotUser?.userId?.name} - Wifi Hotspot`,
        openGraph: {
            images: [editHotspotUser?.userId?.profilePhoto?.url]
        }
    };
};

const HotSpotUserEditPage = async ({ params: { id } }) => {
    const editHotspotUser = await getHotspotUserById(id);

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
            label: 'Edit' + ' > ' + editHotspotUser?.userId?.name,
            current: true
        }
    ];

    return (
        <div>
            <BreadcrumbSection items={items} />
            <div className='max-w-md px-6 py-5 mx-auto md:py-8'>
                <EditForm editHotspotUser={editHotspotUser} />
            </div>
        </div>
    );
};

export default HotSpotUserEditPage;
