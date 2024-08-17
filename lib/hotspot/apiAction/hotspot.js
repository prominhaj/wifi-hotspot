export const deleteActiveHotspotUser = async (userId) => {
    try {
        const deleteResponse = await fetch(
            `${process.env.BASE_URL}/api/mikrotik/hotspot/deleteActiveUser?userId=${userId}`,
            {
                method: 'DELETE'
            }
        );
        const deleteResult = await deleteResponse.json();
        return deleteResult;
    } catch (error) {
        throw new Error(error);
    }
};

export const deleteHotspotUser = async (userId) => {
    try {
        const deleteResponse = await fetch(
            `${process.env.BASE_URL}/api/mikrotik/hotspot/deleteUser?userId=${userId}`,
            {
                method: 'DELETE'
            }
        );
        const deleteResult = await deleteResponse.json();
        return deleteResult;
    } catch (error) {
        throw new Error(error);
    }
};
