import User from '@/modals/user-modal';

export const updateUserInfo = async (id, updateData) => {
    try {
        const user = await User.findByIdAndUpdate(id, updateData);
        return user;
    } catch (error) {
        throw new Error(error);
    }
};
