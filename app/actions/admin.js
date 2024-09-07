'use server';

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
