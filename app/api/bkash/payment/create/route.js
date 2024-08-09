import { bkashAuth } from '@/app/api/bkashAuth';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

export async function POST(req) {
    const { amount = 1, userId } = await req.json();
    const authSuccess = await bkashAuth(req);

    if (!authSuccess) {
        return new Response(JSON.stringify({ error: 'Authentication failed' }), { status: 401 });
    }

    try {
        const { data } = await axios.post(
            process.env.bkash_create_payment_url,
            {
                mode: '0011',
                payerReference: ' ',
                callbackURL: `${process.env.NEXT_PUBLIC_BASE_URL}/api/bkash/payment/callback`,
                amount,
                currency: 'BDT',
                intent: 'sale',
                merchantInvoiceNumber: 'Inv' + uuidv4().substring(0, 5)
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    authorization: req.id_token,
                    'x-app-key': process.env.bkash_api_key
                }
            }
        );

        console.log({ data });

        return new Response(JSON.stringify({ bkashURL: data.bkashURL }), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 401 });
    }
}
