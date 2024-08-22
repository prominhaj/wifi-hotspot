'use server';

import { cookies } from 'next/headers';
import bcrypt from 'bcryptjs';
import User from '@/modals/user-modal';
import { updateUserInfo } from '@/queries/user';
import { replaceMongoIdInObject } from '@/lib/convertData';
import { generateOTP } from '@/lib/otp';
import { loginUser } from './auth';
import { revalidatePath } from 'next/cache';
import { passwordValidation } from '@/lib/validations/user';

export const createAccount = async (data) => {
    try {
        const { name, phone, password } = data;

        // Check if user already exists
        const userExists = await User.exists({ phone });
        if (userExists) {
            return {
                success: false,
                message: 'Phone is already exists',
                phone: true
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
                cookies().delete('otpExpiresAt');
                const user = await getUserById(id);
                const login = await loginUser(user?.phone, user?.password);
                if (login.success) {
                    return { success: true, message: 'OTP Verified Successfully' };
                }
            }
        }
        return { success: false, otpVerify: false, message: 'OTP is not valid' };
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

export const updateUserData = async (id, updatedData) => {
    try {
        const updated = await updateUserInfo(id, updatedData);

        revalidatePath('/');

        return {
            success: !!updated,
            message: updated ? 'User data updated successfully' : 'User data not found'
        };
    } catch (error) {
        throw new Error(error);
    }
};

export const changeUserPassword = async (formData, userId) => {
    // Form Data
    const oldPassword = formData.get('oldPassword');
    const newPassword = formData.get('newPassword');
    const retypePassword = formData.get('confirmPassword');

    try {
        const user = await User.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }

        // Password Validation
        const validatedFields = passwordValidation.safeParse({
            password: newPassword,
            confirmPassword: retypePassword
        });

        if (!validatedFields.success) {
            return {
                errors: validatedFields.error.flatten().fieldErrors
            };
        }

        // Check Old Password
        const isPasswordMatched = oldPassword === user.password;
        if (!isPasswordMatched) {
            return {
                success: false,
                oldPassword: true,
                message: 'Old Password does not match'
            };
        }

        // Check Old Password And New Password
        if (oldPassword === newPassword) {
            return {
                success: false,
                message: 'Old Password and New Password cannot be same'
            };
        }

        // Hash New Password
        await User.findByIdAndUpdate(userId, { password: newPassword });

        // Revalidate Old Password
        revalidatePath('/');

        return {
            success: true,
            message: 'Password updated successfully'
        };
    } catch (error) {
        throw new Error(error.message);
    }
};

export const deleteUserById = async (userId) => {
    try {
        await User.findByIdAndDelete(userId);
        revalidatePath('/');
        
        return { success: true, message: 'User deleted successfully' };
    } catch (error) {
        throw new Error(error.message);
    }
};
