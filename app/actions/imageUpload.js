'use server';

import { fileUploader } from '@/lib/fileUploader';
import { updateUserInfo } from '@/queries/user';
import { revalidatePath } from 'next/cache';

export const updateProfileImage = async (formData, fileName, folder, publicId, userId) => {
    try {
        // Upload profile image
        const uploadImage = await fileUploader(formData, fileName, folder, publicId);

        // Update user profile image in database
        const updateUser = await updateUserInfo(userId, {
            profilePhoto: {
                url: uploadImage?.url,
                public_id: uploadImage?.public_id
            }
        });

        revalidatePath('/');

        if (updateUser) {
            return {
                success: true,
                message: 'Profile image updated successfully',
                profilePhoto: updateUser.profilePhoto
            };
        }
    } catch (error) {
        throw new Error(error);
    }
};
