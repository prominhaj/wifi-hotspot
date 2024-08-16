import { replaceMongoIdInObject } from '@/lib/convertData';
import Payment from '@/modals/payment-modal';
import User from '@/modals/user-modal';

export const getPaymentById = async (id) => {
    try {
        const payment = await Payment.findById(id)
            .populate({
                path: 'userId',
                model: User
            })
            .lean();
        return replaceMongoIdInObject(payment);
    } catch (error) {
        throw new Error(error);
    }
};

export const updatePaymentInfo = async (paymentId, updatedInfo) => {
    try {
        const updatePayment = await Payment.findByIdAndUpdate(paymentId, updatedInfo);
        return updatePayment;
    } catch (error) {
        throw new Error(error);
    }
};
