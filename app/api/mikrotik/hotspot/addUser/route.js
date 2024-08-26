import { loginHotspotUser } from '@/lib/connectHotspot';
import { getExpirationDate } from '@/lib/convertData';
import { getHotspotUserByPhone } from '@/lib/hotspot/dataFetching/hotspot';
import connectToRouter from '@/lib/mikrotik';
import Payment from '@/modals/payment-modal';
import { createHotspotUser, updateHotspotUser } from '@/queries/hotspotUser';
import { getPackageById } from '@/queries/package';
import { updatePaymentInfo } from '@/queries/payment';
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
                `=profile=${getPackage?.profileName}`,
                `=server=${getPackage?.hotspotServer || 'hotspot1'}`,
                `=comment=${user?.name}`
            ]);

            if (results[0]?.ret) {
                const expiredDate = getExpirationDate(getPackage?.validity);
                const hotspotData = {
                    userId,
                    packageId,
                    paymentId: createPayment?._id,
                    hotspotUserId: results[0]?.ret,
                    username: user?.phone,
                    password: user?.phone,
                    expiredAt: expiredDate
                };

                // Save hotspot data to your database
                await createHotspotUser(hotspotData);

                // Connect To User HotSpot in Device
                await loginHotspotUser(user?.phone, user?.phone);

                // find hotspot user and macAddress save in database
                const getCurrentHotspotUser = await getHotspotUserByPhone(user?.phone);
                const updatedHotspotUser = await updateHotspotUser(results[0]?.ret, {
                    macAddress: getCurrentHotspotUser?.user['mac-address']
                });

                if (updatedHotspotUser?.success) {
                    // Payment Status Paid
                    await updatePaymentInfo(hotspotData?.paymentId, {
                        status: 'paid'
                    });

                    // Return the hotspot working on your device
                    return NextResponse.json({
                        success: true,
                        createPayment
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
        return NextResponse.json({ success: false, message: error.message });
    }
};
