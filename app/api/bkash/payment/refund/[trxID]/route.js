import { bkashAuth } from '@/app/api/bkashAuth';
import Payment from '@/modals/payment-modal';
import axios from 'axios';
import { NextResponse } from 'next/server';

export async function POST(req, { params }) {
    const { trxID } = params;
    const authSuccess = await bkashAuth(req);

    if (!authSuccess) {
        return NextResponse.json({ message: 'Authentication failed', success: false });
    }

    try {
        const payment = await Payment.findOne({
            transactionId: trxID
        }).lean();

        if (!payment) {
            return NextResponse.json({ message: 'Transaction not found', success: false });
        }

        const { data } = await axios.post(
            process.env.BKASH_REFUND_TRANSACTION_URL,
            {
                paymentID: payment.paymentId,
                amount: payment.amount,
                trxID,
                sku: 'payment',
                reason: 'cashback'
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    authorization: req.id_token,
                    'x-app-key': process.env.BKASH_API_KEY
                }
            }
        );

        if (data && data.statusCode === '0000') {
            // Update payment status to refunded
            await Payment.updateOne({ transactionId: trxID }, { $set: { status: 'refund' } });
            return NextResponse.json({ message: 'Refund successful', success: true });
        } else {
            return NextResponse.json({ error: 'Refund failed', success: false });
        }
    } catch (error) {
        return NextResponse.json({ error: 'Refund failed', success: false });
    }
}
