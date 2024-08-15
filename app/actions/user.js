'use server';

import { cookies } from 'next/headers';
import bcrypt from 'bcryptjs';
import User from '@/modals/user-modal';
import { updateUserInfo } from '@/queries/user';
import { replaceMongoIdInObject } from '@/lib/convertData';
import { generateOTP } from '@/lib/otp';
import { loginUser } from './auth';

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
        const sendOTP = await generateOTP(phone);
        if (sendOTP.success) {
            // Store other user details in DataBase
            const createdUser = await User.create({ name, phone, password });

            return {
                success: true,
                message: 'Please verify your OTP code',
                user: createdUser
            };
        } else {
            return {
                success: false,
                message: sendOTP.message,
                phone: true
            };
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
                const user = await getUserById(id);
                const login = await loginUser(user?.phone, user?.password);
                if (login.success) {
                    return { success: true, message: 'OTP Verified Successfully' };
                }
            }
        }
        return { success: false, message: 'Invalid OTP' };
    } catch (error) {
        throw new Error(error);
    }
};

export const getUserByPhone = async (phone) => {
    try {
        const user = await User.findOne({ phone }).lean();
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
