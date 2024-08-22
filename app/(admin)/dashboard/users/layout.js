import BreadcrumbSection from '@/components/globals/Breadcrumb/BreadcrumbSection';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// items
const items = [
    {
        label: 'Dashboard',
        href: '/dashboard'
    },
    {
        label: 'Users',
        current: true
    }
];

export const dynamic = 'force-dynamic';

const DashboardUsersPageLayout = ({ children, adminusers }) => {
    return (
        <>
            <BreadcrumbSection items={items} />
            <div className='px-6 py-3'>
                <Tabs defaultValue='admin' className='w-full'>
                    <TabsList className='grid max-w-sm grid-cols-2 mx-auto'>
                        <TabsTrigger value='admin'>Admin</TabsTrigger>
                        <TabsTrigger value='users'>Users</TabsTrigger>
                    </TabsList>
                    <TabsContent value='admin'>{adminusers}</TabsContent>
                    <TabsContent value='users'>{/* <PendingInstructor /> */}</TabsContent>
                </Tabs>
            </div>
        </>
    );
};

export default DashboardUsersPageLayout;
