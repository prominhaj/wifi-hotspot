import BreadcrumbSection from '@/components/globals/Breadcrumb/BreadcrumbSection';
import { Suspense } from 'react';
import LoadingUI from '@/components/globals/Loading/LoadingUI';
import MacAddressTable from './_components/MacAddressTable';

// items
const items = [
    {
        label: 'Dashboard',
        href: '/dashboard'
    },
    {
        label: 'MacAddress',
        current: true
    }
];

const MacAddressPage = async () => {
    return (
        <div>
            <BreadcrumbSection items={items} />
            <Suspense
                fallback={
                    <div className='py-8'>
                        <LoadingUI />
                    </div>
                }
            >
                <MacAddressTable />
            </Suspense>
        </div>
    );
};

export default MacAddressPage;
