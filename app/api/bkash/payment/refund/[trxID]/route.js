import { bkashAuth } from '@/app/api/bkashAuth';
import axios from 'axios';

export async function POST(req, { params }) {
    const { trxID } = params;
    const authSuccess = await bkashAuth(req);

    if (!authSuccess) {
        return new Response(JSON.stringify({ error: 'Authentication failed' }), { status: 401 });
    }

    try {
        if (!payment) {
            return new Response(JSON.stringify({ error: 'Transaction not found' }), {
                status: 404
            });
        }

        const { data } = await axios.post(
            process.env.BKASH_REFUND_TRANSACTION_URL,
            {
                paymentID: payment.paymentID,
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
            return new Response(JSON.stringify({ message: 'Refund successful' }), { status: 200 });
        } else {
            return new Response(JSON.stringify({ error: 'Refund failed' }), { status: 404 });
        }
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Refund failed' }), { status: 404 });
    }
}
