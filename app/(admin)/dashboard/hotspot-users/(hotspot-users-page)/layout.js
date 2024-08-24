import BreadcrumbSection from '@/components/globals/Breadcrumb/BreadcrumbSection';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

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

const HotspotUserLayout = ({ activehotspotusers, expiredhotspotusers }) => {
    return (
        <>
            <BreadcrumbSection items={items} />
            <div className='px-6 py-3'>
                <Tabs defaultValue='active' className='w-full'>
                    <TabsList className='grid max-w-sm grid-cols-2 mx-auto'>
                        <TabsTrigger value='active'>Active</TabsTrigger>
                        <TabsTrigger value='expired'>Expired</TabsTrigger>
                    </TabsList>
                    <TabsContent value='active'>{activehotspotusers}</TabsContent>
                    <TabsContent value='expired'>{expiredhotspotusers}</TabsContent>
                </Tabs>
            </div>
        </>
    );
};

export default HotspotUserLayout;
