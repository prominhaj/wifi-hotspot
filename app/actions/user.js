'use server';

import { sendSMS } from '@/lib/sms';
import { cookies } from 'next/headers';
import bcrypt from 'bcryptjs';
import User from '@/modals/user-modal';
import { updateUserInfo } from '@/queries/user';

export const createAccount = async (data) => {
    try {
        const { name, phone, password } = data;
        // Check if user already exists
        const userExists = await User.exists({ phone });
        if (userExists) {
            throw new Error('User already exists');
        }

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
            const createdUser = await User.create({ name, phone, password: hashedPassword });

            return {
                success: true,
                message: 'User Created SuccessFull',
                user: createdUser
            };
        } else {
            throw new Error('Failed to send OTP');
        }
    } catch (error) {
        throw new Error(error);
    }
};

export const verifyOtp = async (otp, id) => {
    try {
        const sentOtp = cookies().get('otp').value;
        const verify = await bcrypt.compare(otp, sentOtp);
        if (verify) {
            await updateUserInfo(id, {
                verified: true
            });
            cookies().delete('otp');
            return { success: true, message: 'OTP Verified Successfully' };
        }
        return { success: false, message: 'Invalid OTP' };
    } catch (error) {
        throw new Error(error);
    }
};
