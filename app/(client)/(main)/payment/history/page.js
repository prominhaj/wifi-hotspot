import { getSessionUser } from '@/lib/dal';
import PaymentHistoryContent from './_components/PaymentHistoryContent';
import { getPaymentHistoriesByUserId } from '@/queries/payment';

export const metadata = {
    title: 'Payment History - Shakib Electronics',
    keywords: [
        'Next.js',
        'React',
        'JavaScript',
        'Wifi - Shakib Electronics',
        'Wifi Hotspot',
        'Hotspot',
        'Shakib Electronics',
        'Wifi',
        'Mikrotik',
        'Payment History Page'
    ]
};

const PaymentHistory = async () => {
    const sessionUser = await getSessionUser();
    const paymentHistories = await getPaymentHistoriesByUserId(sessionUser?.id);

    return (
        <>
            <PaymentHistoryContent transactions={paymentHistories} />
        </>
    );
};

export default PaymentHistory;
