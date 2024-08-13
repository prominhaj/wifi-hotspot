import User from '@/modals/user-modal';

export const getUserByPhone = async (phone) => {
    try {
        const getUser = await User.findOne({ phone }).lean();
        console.log(getUser);
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
