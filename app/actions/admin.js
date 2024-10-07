'use server';

import { deleteFile } from '@/lib/fileUploader';
import User from '@/modals/user-modal';
import { revalidatePath } from 'next/cache';

export const updateHotspotUsersMacAddress = async () => {
    try {
        const response = await fetch(`${process.env.BASE_URL}/api/update-mac-address`);
        const result = await response.json();
        if (result?.success) {
            return {
                success: true,
                message: result.message
            };
        }
        return {
            success: false,
            message: result.message
        };
    } catch (error) {
        throw new Error(error);
    }
};

export const userPhotoDelete = async (userId, publicId) => {
    try {
        const deleted = await deleteFile(publicId);
        if (deleted.result === 'ok') {
            await User.findByIdAndUpdate(userId, { profilePhoto: null });

            revalidatePath('/');

            return {
                success: true,
                message: 'User profile photo deleted successfully'
            };
        }
    } catch (error) {
        throw new Error(error);
    }
};
