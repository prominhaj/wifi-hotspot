'use server';

import { generateOTP } from '@/lib/otp';
import User from '@/modals/user-modal';
import { updateUserInfo } from '@/queries/user';

export const changeOtpCode = async (phone, id) => {
    try {
        // Check if user already exists
        const userExists = await User.exists({ phone });
        if (userExists) {
            throw new Error('This number already exists');
        }
        // Generate a new OTP code
        const sentOTP = await generateOTP(phone);
        if (sentOTP.success) {
            // Update Database
            await updateUserInfo(id, {
                phone
            });
            return {
                success: true,
                message: 'Phone number change and sent new OTP Code'
            };
        } else {
            return {
                success: false,
                message: sentOTP.message,
                phone: true
            };
        }
    } catch (error) {
        throw new Error(error);
    }
};
