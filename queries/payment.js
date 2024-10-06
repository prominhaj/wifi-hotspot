import { replaceMongoIdInArray, replaceMongoIdInObject } from '@/lib/convertData';
import Package from '@/modals/package-modal';
import Payment from '@/modals/payment-modal';
import User from '@/modals/user-modal';

export const getAllPayments = async () => {
    try {
        const payments = await Payment.find()
            .populate({
                path: 'userId',
                model: User
            })
            .sort({ createdAt: -1 })
            .lean();
        return JSON.stringify(payments);
    } catch (error) {
        throw new Error(error);
    }
};

export const getPaymentById = async (id) => {
    try {
        const payment = await Payment.findById(id)
            .populate({
                path: 'userId',
                model: User
            })
            .populate({
                path: 'packageId',
                model: Package
            })
            .lean();
        return replaceMongoIdInObject(payment);
    } catch (error) {
        throw new Error(error);
    }
};

export const getPaymentsByUserId = async (userId) => {
    try {
        const payments = await Payment.find({
            userId
        })
            .populate({
                path: 'userId',
                model: User
            })
            .populate({
                path: 'packageId',
                model: Package
            })
            .sort({ createdAt: -1 })
            .lean();
        return replaceMongoIdInArray(payments);
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
        return JSON.stringify(recentTransaction);
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

export const getLastRecentTransaction = async () => {
    try {
        const lastRecentTransaction = await Payment.find()
            .limit(8)
            .populate({
                path: 'userId',
                model: User
            })
            .sort({ createdAt: -1 })
            .lean();
        return replaceMongoIdInArray(lastRecentTransaction);
    } catch (error) {
        throw new Error(error);
    }
};
