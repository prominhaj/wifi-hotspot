import { replaceMongoIdInObject } from '@/lib/convertData';
import connectToRouter from '@/lib/mikrotik';
import Package from '@/modals/package-modal';

export const getAllPackages = async () => {
    try {
        const packages = await Package.find()
            .sort({
                validity: 1
            })
            .lean();
        return JSON.stringify(packages);
    } catch (error) {
        throw new Error(error);
    }
};

export const getPackageById = async (id) => {
    try {
        const getPackage = await Package.findById(id).lean();
        return replaceMongoIdInObject(getPackage);
    } catch (error) {
        throw new Error(error);
    }
};

export const getPopularPackage = async () => {
    try {
        const popularPackage = await Package.findOne({
            validity: 30
        }).lean();
        return popularPackage;
    } catch (error) {
        throw new Error(error);
    }
};

export const getPackagesInMikrotik = async () => {
    const conn = await connectToRouter();
    try {
        const profiles = await conn.write('/ip/hotspot/user/profile/print');
        return profiles;
    } catch (error) {
        throw new Error(error);
    }
};
