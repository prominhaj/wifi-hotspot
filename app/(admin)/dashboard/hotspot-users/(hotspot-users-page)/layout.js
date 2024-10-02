import BreadcrumbSection from '@/components/globals/Breadcrumb/BreadcrumbSection';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { totalExpiredHotspotUsers, totalHotspotUsers } from '@/queries/hotspotUser';

// items
const items = [
    {
        label: 'Dashboard',
        href: '/dashboard'
    },
    {
        label: 'Hotspot Users',
        current: true
    }
];

const HotspotUserLayout = async ({ activehotspotusers, hotspotusers, expiredhotspotusers }) => {
    const totalUsers = await totalHotspotUsers();
    const totalExpiredUsers = await totalExpiredHotspotUsers();

    return (
        <>
            <BreadcrumbSection items={items} />
            <div className='px-6 py-3'>
                <Tabs defaultValue='activeusers' className='w-full'>
                    <TabsList className='grid max-w-sm grid-cols-3 mx-auto'>
                        <TabsTrigger value='activeusers'>Active</TabsTrigger>
                        <TabsTrigger value='hotspotusers'>Users ({totalUsers})</TabsTrigger>
                        <TabsTrigger value='expired'>Expired ({totalExpiredUsers})</TabsTrigger>
                    </TabsList>
                    <TabsContent value='activeusers'>{activehotspotusers}</TabsContent>
                    <TabsContent value='hotspotusers'>{hotspotusers}</TabsContent>
                    <TabsContent value='expired'>{expiredhotspotusers}</TabsContent>
                </Tabs>
            </div>
        </>
    );
};

export default HotspotUserLayout;
