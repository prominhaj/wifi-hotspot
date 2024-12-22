'use server';
import { cookies } from 'next/headers';
import { sendSMS } from './sms';
import bcrypt from 'bcryptjs';

export const generateOTP = async (phone) => {
    try {
        const number = parseInt(phone);
        const otp = Math.floor(1000 + Math.random() * 9000);
        const message = `Your Shakib Electronics OTP is ${otp}`;
        const sentOTP = await sendSMS(number, message);

        if (sentOTP?.success) {
            // Store OTP Code in cookies with 5-minute expiration
            const expiresAt = new Date(Date.now() + 5 * 60 * 1000);
            const hashOtp = await bcrypt.hash(otp.toString(), 4);

            // Store OTP Code in cookies with 5-minute expiration
            cookies().set('otp', hashOtp, {
                httpOnly: true,
                secure: true,
                expires: expiresAt,
                sameSite: 'lax'
            });

            // Store OTP expiration time
            cookies().set('otpExpiresAt', expiresAt.toISOString(), {
                httpOnly: true,
                secure: true,
                expires: expiresAt,
                sameSite: 'lax'
            });

            return sentOTP;
        } else {
            return {
                success: false,
                message: sentOTP?.message,
                phone: true
            };
        }
    } catch (error) {
        throw new Error(error);
    }
};
