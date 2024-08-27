import BreadcrumbSection from '@/components/globals/Breadcrumb/BreadcrumbSection';
import { getAllPayments } from '@/queries/payment';
import { DataTable } from '../../_components/Table/Table';
import { columns } from '../../_components/Table/columns';

// Metadata
export const metadata = {
    title: 'Payment History - Wifi Hotspot',
    description: 'Explore || Add || Build || Share'
};

// items
const items = [
    {
        label: 'Dashboard',
        href: '/dashboard'
    },
    {
        label: 'Payment History',
        current: true
    }
];

const DashboardPaymentHistoryPage = async () => {
    const payments = await getAllPayments();

    return (
        <div>
            <BreadcrumbSection items={items} />
            <div className='px-6 py-3'>
                <DataTable columns={columns} data={payments} />
            </div>
        </div>
    );
};

export default DashboardPaymentHistoryPage;
