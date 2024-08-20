import { getSessionUser } from '@/lib/dal';
import PaymentHistoryContent from './_components/PaymentHistoryContent';
import { getPaymentHistoriesByUserId } from '@/queries/payment';

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
