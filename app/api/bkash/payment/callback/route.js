import axios from 'axios';
import { bkashAuth } from '@/app/api/bkashAuth';

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const paymentID = searchParams.get('paymentID');
    const status = searchParams.get('status');

    if (status === 'cancel' || status === 'failure') {
        return Response.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/error?message=${status}`);
    }

    if (status === 'success') {
        const authSuccess = await bkashAuth(req);

        if (!authSuccess) {
            return new Response(JSON.stringify({ error: 'Authentication failed' }), {
                status: 401
            });
        }

        try {
            const { data } = await axios.post(
                process.env.bkash_execute_payment_url,
                { paymentID },
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

            if (data && data.statusCode === '0000') {
                return Response.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/success`);
            } else {
                return Response.redirect(
                    `${process.env.NEXT_PUBLIC_BASE_URL}/error?message=${data.statusMessage}`
                );
            }
        } catch (error) {
            console.log(error);
            return Response.redirect(
                `${process.env.NEXT_PUBLIC_BASE_URL}/error?message=${error.message}`
            );
        }
    }
}
