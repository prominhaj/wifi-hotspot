import { getPaymentById, updatePaymentInfo } from '@/queries/payment';
import CheckPayment from './_components/CheckPayment';
import { getSessionUser } from '@/lib/dal';
import { updateHotspotUser } from '@/queries/hotspotUser';
import { redirect } from 'next/navigation';
import {
    getHotspotActiveUserByPhone,
    getHotspotUserByPhone
} from '@/lib/hotspot/dataFetching/hotspot';
import WrongPaymentUser from './_components/WrongPaymentUser';

const PaymentPage = async ({ searchParams: { success, trxID, paymentId, message, login } }) => {
    const sessionUser = await getSessionUser();
    const getActiveHotspotUser = await getHotspotActiveUserByPhone(sessionUser?.phone);
    const getHotspotUser = await getHotspotUserByPhone(sessionUser?.phone);

    // Hotspot User Login Success Then Working
    if (login) {
        if (getHotspotUser?.success) {
            const updatedHotspotUser = await updateHotspotUser(getHotspotUser?.user['.id'], {
                macAddress: getActiveHotspotUser?.user['mac-address']
            });
            if (updatedHotspotUser.success) {
                redirect('/');
            }
        }
    }

    // Payment Confirmation Success Then Working
    if (paymentId && trxID && success) {
        try {
            const getPayment = await getPaymentById(paymentId);
            const matches =
                getPayment.transactionId === trxID &&
                getPayment.id === paymentId &&
                getPayment.status === 'pending';

            if (matches) {
                await updatePaymentInfo(paymentId, {
                    status: 'paid'
                });
                return <CheckPayment user={getPayment?.userId} />;
            } else {
                return <WrongPaymentUser getPayment={getPayment} paymentId={paymentId} />;
            }
        } catch (error) {
            throw new Error(error);
        }
    } else {
        return <WrongPaymentUser message={message} />;
    }
};

export default PaymentPage;
