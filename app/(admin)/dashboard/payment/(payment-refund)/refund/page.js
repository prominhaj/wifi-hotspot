import BreadcrumbSection from '@/components/globals/Breadcrumb/BreadcrumbSection';
import PaymentRefundForm from '../_components/PaymentRefundForm';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Metadata
export const metadata = {
    title: 'Payment Refund - Wifi Hotspot',
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
        href: '/dashboard/payment/history'
    },
    {
        label: 'Payment Refund',
        current: true
    }
];

const PaymentRefundPage = () => {
    return (
        <div>
            <BreadcrumbSection items={items} />
            <div className='px-6 py-3 mt-10 md:mt-20'>
                <Card className='w-full max-w-md mx-auto'>
                    <CardHeader className='p-3 md:p-6'>
                        <CardTitle className='text-2xl font-bold'>Payment Refund</CardTitle>
                    </CardHeader>
                    <CardContent className='p-3 !pt-0 md:p-6'>
                        {/* Payment Refund Form */}
                        <PaymentRefundForm />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default PaymentRefundPage;
