'use server';

import { replaceMongoIdInObject } from '@/lib/convertData';
import Package from '@/modals/package-modal';
import { getHotspotProfileById } from '@/queries/mikrotik';
import { revalidatePath } from 'next/cache';
import { createProfileInMikrotik } from './mikrotik';

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

// Recover the package in the database
export const recoverPackageInDB = async () => {
    try {
        const packages = await Package.find().lean();

        await Promise.all(
            packages.map(async (pack) => {
                const rate_limit = `${pack.speedLimit}M/${pack.speedLimit}M`;

                const hotspotProfile = await getHotspotProfileById(pack.hotspotProfileId);
                if (!hotspotProfile?.[0]?.['.id']) {
                    const createdProfile = await createProfileInMikrotik({
                        name: pack.name,
                        rate_limit
                    });

                    if (createdProfile?.[0]?.ret) {
                        await Package.findByIdAndUpdate(pack._id, {
                            hotspotProfileId: createdProfile[0]?.ret
                        });
                    }
                }
            })
        );

        return {
            success: true,
            message: 'Packages recovered successfully'
        };
    } catch (error) {
        throw new Error(error.message);
    }
};
