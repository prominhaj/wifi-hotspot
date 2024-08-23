import BreadcrumbSection from '@/components/globals/Breadcrumb/BreadcrumbSection';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Link from 'next/link';

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
                <div className='flex items-center justify-between gap-3'>
                    <h1 className='text-2xl font-bold'>Packages</h1>
                    <Link
                        className={cn(buttonVariants({ variant: 'default' }))}
                        href='/dashboard/packages/add'
                    >
                        Add Package
                    </Link>
                </div>
                <div>{packages}</div>
            </div>
        </>
    );
};

export default DashboardPackagesPageLayout;
