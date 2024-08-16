import connectToRouter from '@/lib/mikrotik';
import Payment from '@/modals/payment-modal';
import { createHotspotUser } from '@/queries/hotspotUser';
import { getPackageById } from '@/queries/package';
import { getUserById } from '@/queries/user';
import { NextResponse } from 'next/server';

export const POST = async (req) => {
    const { packageId, userId, data } = await req.json();
    const user = await getUserById(userId);
    const getPackage = await getPackageById(packageId);

    try {
        const paymentData = {
            userId,
            amount: data?.amount,
            transactionId: data?.trxID,
            packageId,
            paymentId: data?.paymentID,
            merchantInvoiceNumber: data?.merchantInvoiceNumber,
            paymentExecuteTime: data?.paymentExecuteTime,
            customerMsisdn: data?.customerMsisdn,
            paymentMethod: 'bkash'
        };

        // Save payment data to your database
        const createPayment = await Payment.create(paymentData);

        if (createPayment?._id) {
            const conn = await connectToRouter();
            const results = await conn.write('/ip/hotspot/user/add', [
                `=name=${user?.phone}`,
                `=password=${user?.phone}`,
                `=profile=${getPackage?.profileType}`,
                `=server=${getPackage?.server || 'hotspot1'}`,
                `=comment=up-`
            ]);

            conn.close();

            if (results[0]?.ret) {
                const createdHotspotUserResponse = await fetch(
                    `${process.env.NEXT_PUBLIC_BASE_URL}/api/mikrotik/hotspot/getUserById?id=${results[0]?.ret}`
                );
                const createdHotspotUser = await createdHotspotUserResponse.json();

                if (createdHotspotUser?.success) {
                    // Save hotspot user to your database
                    const newHotspotUserData = {
                        userId,
                        paymentId: createPayment?._id,
                        hotspotUserId: results[0]?.ret,
                        username: createdHotspotUser?.user?.name,
                        password: createdHotspotUser?.user?.password,
                        hotspotProfile: createdHotspotUser?.user?.profile,
                        hotspotSever: createdHotspotUser?.user?.server
                    };

                    const saveHotspotUserOnDB = await createHotspotUser(newHotspotUserData);

                    if (saveHotspotUserOnDB.success) {
                        return NextResponse.json({
                            success: true,
                            createPayment
                        });
                    }
                    return NextResponse.json({
                        success: false,
                        message: 'Failed to save hotspot user on database'
                    });
                }
            } else {
                // TODO: refund the user payment
                return NextResponse.json({
                    success: false,
                    message: 'Hotspot user creation failed'
                });
            }
        } else {
            return NextResponse.json({ success: false, message: 'Payment creation failed' });
        }
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message });
    }
};
