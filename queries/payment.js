import { replaceMongoIdInArray, replaceMongoIdInObject } from '@/lib/convertData';
import Package from '@/modals/package-modal';
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

export const getRecentTransaction = async (userId) => {
    try {
        const recentTransaction = await Payment.findOne({
            userId
        })
            .sort({ createdAt: -1 })
            .limit(1)
            .populate({
                path: 'packageId',
                model: Package
            })
            .lean();
        return replaceMongoIdInObject(recentTransaction);
    } catch (error) {
        throw new Error(error);
    }
};

export const getPaymentHistoriesByUserId = async (userId) => {
    try {
        const paymentHistories = await Payment.find({
            userId
        })
            .sort({ createdAt: -1 })
            .lean();

        return replaceMongoIdInArray(paymentHistories);
    } catch (error) {
        throw new Error(error);
    }
};
