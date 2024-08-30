'use server';

import Payment from '@/modals/payment-modal';
import { revalidatePath } from 'next/cache';

export const packagePayment = async (amount, userId) => {
    try {
        const response = await fetch(`${process.env.BASE_URL}/api/bkash/payment/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ amount, userId })
        });
        const { bkashURL } = await response.json();
        return bkashURL;
    } catch (error) {
        throw new Error(error);
    }
};

export const paymentRefundInBkash = async (txId) => {
    try {
        const response = await fetch(`${process.env.BASE_URL}/api/bkash/payment/refund/${txId}`, {
            method: 'POST'
        });
        const result = await response.json();

        // revalidatePath
        revalidatePath('/');

        return result;
    } catch (error) {
        throw new Error(error);
    }
};

export const deletePaymentHistoryById = async (id) => {
    try {
        await Payment.findByIdAndDelete(id);

        // revalidatePath
        revalidatePath('/');

        return { success: true, message: 'Payment Deleted Successfully' };
    } catch (error) {
        throw new Error(error);
    }
};

export const updatePaymentById = async (paymentId, updateInfo) => {
    try {
        await Payment.findByIdAndUpdate(paymentId, updateInfo);

        // revalidatePath
        revalidatePath('/');

        return {
            success: true,
            message: 'Payment Updated Successfully'
        };
    } catch (error) {
        throw new Error(error);
    }
};
