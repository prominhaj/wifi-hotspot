'use server';

import { sendSMS } from '@/lib/sms';
import { cookies } from 'next/headers';
import bcrypt from 'bcryptjs';
import User from '@/modals/user-modal';

export const createAccount = async (data) => {
    try {
        const { name, phone, password } = data;
        // Sent OTP Code
        const number = parseInt(phone);
        const otp = Math.floor(1000 + Math.random() * 9000);
        const message = `Your Shakib Electronics OTP is ${otp}`;
        const sentOTP = await sendSMS(number, message);

        if (sentOTP) {
            // Store OTP Code in cookies
            const hashOtp = await bcrypt.hash(otp.toString(), 4);
            cookies().set('otp', hashOtp);

            // Store other user details in DataBase
            const hashedPassword = await bcrypt.hash(password, 10);
            // Create new user in DataBase
            await User.create({ name, phone, password: hashedPassword });

            return { success: true, message: 'User Created SuccessFull' };
        } else {
            throw new Error('Failed to send OTP');
        }
    } catch (error) {
        throw new Error(error);
    }
};
