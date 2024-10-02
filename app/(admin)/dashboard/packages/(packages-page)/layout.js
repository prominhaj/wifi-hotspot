import BreadcrumbSection from '@/components/globals/Breadcrumb/BreadcrumbSection';
// items
const items = [
    {
        label: 'Dashboard',
        href: '/dashboard'
    },
    {
        label: 'Packages',
        current: true
    }
];

const DashboardPackagesPageLayout = ({ packages }) => {
    return (
        <>
            <BreadcrumbSection items={items} />
            <div className='px-6 py-3'>
                <h1 className='text-2xl font-bold'>Packages</h1>
                <div>{packages}</div>
            </div>
        </>
    );
};

export default DashboardPackagesPageLayout;
