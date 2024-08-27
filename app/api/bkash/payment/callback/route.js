import axios from 'axios';
import { bkashAuth } from '@/app/api/bkashAuth';
import { NextResponse } from 'next/server';

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const paymentID = searchParams.get('paymentID');
    const status = searchParams.get('status');
    const userId = searchParams.get('userId');
    const packageId = searchParams.get('packageId');

    if (status === 'cancel' || status === 'failure') {
        return NextResponse.redirect(`${process.env.BASE_URL}/?message=${status}`);
    }

    if (status === 'success') {
        const authSuccess = await bkashAuth(req);

        if (!authSuccess) {
            return NextResponse.json({ error: 'Authentication failed', status: 401 });
        }

        try {
            const { data } = await axios.post(
                process.env.BKASH_EXECUTE_PAYMENT_URL,
                { paymentID },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                        authorization: req.id_token,
                        'x-app-key': process.env.BKASH_API_KEY
                    }
                }
            );

            // Payment Success
            if (data && data.statusCode === '0000') {
                // Create New user in mikrotik
                const createdUserInMikrotik = await fetch(
                    `${process.env.BASE_URL}/api/mikrotik/hotspot/addUser`,
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            Accept: 'application/json'
                        },
                        body: JSON.stringify({
                            packageId,
                            userId,
                            data
                        })
                    }
                );

                const mikrotikResponse = await createdUserInMikrotik.json();
                if (mikrotikResponse?.success) {
                    const redirectUrl = `${process.env.BASE_URL}/payment?success=${
                        mikrotikResponse?.success
                    }&trxID=${
                        mikrotikResponse?.createPayment?.transactionId
                    }&paymentId=${mikrotikResponse?.createPayment?._id.toString()}`;

                    return NextResponse.redirect(redirectUrl);
                } else {
                    return NextResponse.redirect(
                        `${process.env.BASE_URL}/payment?success=${mikrotikResponse?.success}&message=${mikrotikResponse?.message}`
                    );
                }
            } else {
                return NextResponse.redirect(
                    `${process.env.BASE_URL}/payment?success=false&message=${data.statusMessage}`
                );
            }
        } catch (error) {
            console.log(error);

            return NextResponse.redirect(
                `${process.env.BASE_URL}/payment?success=false&message=${error.message}`
            );
        }
    }
}
