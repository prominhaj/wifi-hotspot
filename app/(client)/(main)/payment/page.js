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
import { CircleCheck } from 'lucide-react';

const PaymentPage = async ({ searchParams: { success, trxID, paymentId, message, login } }) => {
    const sessionUser = await getSessionUser();
    const getActiveHotspotUser = await getHotspotActiveUserByPhone(sessionUser?.phone);
    const getHotspotUser = await getHotspotUserByPhone(sessionUser?.phone);

    // Hotspot User Login Success Then Working
    if (login) {
        if (getHotspotUser?.success) {
            const updatedHotspotUser = await updateHotspotUser(getHotspotUser?.user['.id'], {
                macAddress: getActiveHotspotUser?.user?.['mac-address']
            });
            if (updatedHotspotUser.success) {
                redirect('/');
            }
        }
        return <LoginSuccess />;
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

const LoginSuccess = () => {
    return (
        <div className='flex flex-col items-center justify-center flex-1 w-full h-full my-16'>
            <div className='flex flex-col items-center max-w-full gap-6 text-center'>
                <>
                    <CircleCheck className='w-32 h-32 p-0 text-white bg-green-500 rounded-full' />
                    <h1 className='text-xl md:text-2xl lg:text-3xl'>Login Successfully</h1>
                </>
            </div>
        </div>
    );
};

export default PaymentPage;
