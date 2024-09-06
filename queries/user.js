import { replaceMongoIdInArray, replaceMongoIdInObject } from '@/lib/convertData';
import User from '@/modals/user-modal';

export const getUserByPhone = async (phone) => {
    try {
        const getUser = await User.findOne({ phone }).lean();
        return getUser;
    } catch (error) {
        throw new Error(error);
    }
};

export const updateUserInfo = async (id, updateData) => {
    try {
        const user = await User.findByIdAndUpdate(id, updateData);
        return user;
    } catch (error) {
        throw new Error(error);
    }
};

export const getUserById = async (id) => {
    try {
        const user = await User.findById(id).select('-password').lean();
        return replaceMongoIdInObject(user);
    } catch (error) {
        throw new Error(error);
    }
};

export const getAllUsers = async () => {
    try {
        const users = await User.find().select('-password').lean();
        return replaceMongoIdInArray(users);
    } catch (error) {
        throw new Error(error);
    }
};

export const getTotalUsers = async () => {
    try {
        const totalUsers = await User.countDocuments();
        return totalUsers;
    } catch (error) {
        throw new Error(error);
    }
};

// Admin
export const getAllAdminUsers = async () => {
    try {
        const adminUsers = await User.find({ role: 'admin' }).select('-password').lean();
        return replaceMongoIdInArray(adminUsers);
    } catch (error) {
        throw new Error(error);
    }
};

export const getAllRoleUsers = async () => {
    try {
        const roleUsers = await User.find({ role: 'user' })
            .select('-password')
            .sort({ createdAt: -1 })
            .lean();
        return replaceMongoIdInArray(roleUsers);
    } catch (error) {
        throw new Error(error);
    }
};
