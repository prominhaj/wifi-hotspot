import { bkashAuth } from '@/app/api/bkashAuth';
import axios from 'axios';
import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

export async function POST(req) {
    const { amount, userId } = await req.json();
    const authSuccess = await bkashAuth(req);

    if (!authSuccess) {
        return NextResponse.json({ error: 'Authentication failed', status: 401 });
    }

    try {
        const { data } = await axios.post(
            process.env.BKASH_CREATE_PAYMENT_URL,
            {
                mode: '0011',
                payerReference: ' ',
                callbackURL: `${process.env.BASE_URL}/api/bkash/payment/callback?userId=${userId}`,
                amount,
                userId,
                currency: 'BDT',
                intent: 'sale',
                merchantInvoiceNumber: 'Inv' + uuidv4().substring(0, 5)
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

        return NextResponse.json({ bkashURL: data.bkashURL, status: 200 });
    } catch (error) {
        return NextResponse.error({ error: error.message, status: 401 });
    }
}
