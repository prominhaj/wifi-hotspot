'use server';

import { replaceMongoIdInObject } from '@/lib/convertData';
import Package from '@/modals/package-modal';
import { revalidatePath } from 'next/cache';

export const getPackageByIdInAction = async (id) => {
    try {
        const getPackage = await Package.findById(id).lean();
        return replaceMongoIdInObject(getPackage);
    } catch (error) {
        throw new Error(error);
    }
};

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

export const updatePackageById = async (packageId, updatedData) => {
    try {
        await Package.findByIdAndUpdate(packageId, updatedData);

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
