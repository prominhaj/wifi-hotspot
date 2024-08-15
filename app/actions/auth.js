'use server';

import { createSession } from '@/lib/session';
import { getUserByPhone } from './user';

export const loginUser = async (phone, password) => {
    try {
        const user = await getUserByPhone(phone);
        console.log(user);

        if (!user) {
            return {
                success: false,
                phone: true,
                message: 'Phone number not found'
            };
        }
        if (user?.password !== password) {
            return {
                success: false,
                password: true,
                message: 'Invalid password'
            };
        }

        if (!user?.verified) {
            return {
                success: false,
                verified: true,
                message: 'Phone number not verified'
            };
        }

        // Create a session for the user
        await createSession(user?.id);

        return {
            success: true,
            message: 'Logged in successfully',
            user
        };
    } catch (error) {
        throw new Error(error);
    }
};
