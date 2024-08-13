'use server';

import { sendSMS } from '@/lib/sms';
import { cookies } from 'next/headers';
import bcrypt from 'bcryptjs';
import User from '@/modals/user-modal';
import { updateUserInfo } from '@/queries/user';
import { replaceMongoIdInObject } from '@/lib/convertData';

export const createAccount = async (data) => {
    try {
        const { name, phone, password } = data;

        // Check if user already exists
        const userExists = await User.exists({ phone });
        if (userExists) {
            return {
                success: false,
                message: 'User already exists'
            };
        }

        // Send OTP Code
        const number = parseInt(phone);
        const otp = Math.floor(1000 + Math.random() * 9000);
        const message = `Your Shakib Electronics OTP is ${otp}`;
        const sentOTP = await sendSMS(number, message);

        if (sentOTP) {
            // Store OTP Code in cookies
            const hashOtp = await bcrypt.hash(otp.toString(), 4);
            cookies().set('otp', hashOtp);

            // Store other user details in DataBase
            const createdUser = await User.create({ name, phone, password });

            return {
                success: true,
                message: 'User Created Successfully and Logged in',
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
        const saveOtp = cookies().get('otp')?.value;

        if (!saveOtp) {
            throw new Error('OTP not found');
        }

        const verify = await bcrypt.compare(otp, saveOtp);

        if (verify) {
            const userUpdated = await updateUserInfo(id, {
                verified: true
            });
            if (userUpdated) {
                cookies().delete('otp');
                return { success: true, message: 'OTP Verified Successfully' };
            }
        }
        return { success: false, message: 'Invalid OTP' };
    } catch (error) {
        throw new Error(error);
    }
};

export const getUserByPhone = async (phone) => {
    try {
        const user = await User.findOne({ phone }).select('-password').lean();
        return replaceMongoIdInObject(user);
    } catch (error) {
        throw new Error(error);
    }
};

export const getUserById = async (id) => {
    try {
        const user = await User.findById(id).lean();
        return replaceMongoIdInObject(user);
    } catch (error) {
        throw new Error(error);
    }
};
