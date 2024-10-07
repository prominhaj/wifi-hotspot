import { replaceMongoIdInArray, replaceMongoIdInObject } from '@/lib/convertData';
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
        return replaceMongoIdInObject(popularPackage);
    } catch (error) {
        throw new Error(error);
    }
};
