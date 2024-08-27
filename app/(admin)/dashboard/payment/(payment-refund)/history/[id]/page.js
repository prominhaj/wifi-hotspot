import BreadcrumbSection from '@/components/globals/Breadcrumb/BreadcrumbSection';
import { getPaymentById } from '@/queries/payment';
import PaymentDetailsCard from '../../../_components/PaymentDetailsCard';

// MetaData
export const metadata = {
    title: 'Payment Details - Wifi Hotspot',
    description: 'Explore || Add || Build || Share'
};

const items = [
    {
        label: 'Dashboard',
        href: '/dashboard'
    },
    {
        label: 'Payment History',
        href: '/dashboard/payment/history'
    },
    {
        label: 'Details',
        current: true
    }
];

const PaymentHistoryDetailsPage = async ({ params: { id } }) => {
    const payment = await getPaymentById(id);

    return (
        <div>
            <BreadcrumbSection items={items} />
            <div className='flex items-center justify-center max-w-5xl p-6 mx-auto mt-3 rounded-lg md:mt-5'>
                <div className='w-full max-w-full bg-background/10'>
                    <PaymentDetailsCard payment={payment} />
                </div>
            </div>
        </div>
    );
};

export default PaymentHistoryDetailsPage;
