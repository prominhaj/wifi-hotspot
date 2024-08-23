'use server';

import Package from '@/modals/package-modal';
import { revalidatePath } from 'next/cache';

export const createPackage = async (packageData) => {
    try {
        await Package.create(packageData);

        // revalidatePath
        revalidatePath('/');

        return {
            success: true
        };
    } catch (error) {
        throw new Error(error);
    }
};

export const deletePackageById = async (packageId) => {
    try {
        await Package.findByIdAndDelete(packageId);

        // revalidatePath
        revalidatePath('/');

        return { success: true };
    } catch (error) {
        throw new Error(error);
    }
};
