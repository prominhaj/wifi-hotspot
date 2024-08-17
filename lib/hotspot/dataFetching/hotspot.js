export const getHotspotActiveUserByPhone = async (phone) => {
    const activeHotspotUserResponse = await fetch(
        `${process.env.BASE_URL}/api/mikrotik/hotspot/getActiveUserByUsername?phone=${phone}`
    );
    const activeHotspotUser = await activeHotspotUserResponse.json();
    return activeHotspotUser;
};

export const getHotspotUserByPhone = async (phone) => {
    const hotspotUserResponse = await fetch(
        `${process.env.BASE_URL}/api/mikrotik/hotspot/getUserByUsername?phone=${phone}`
    );
    const hotspotUser = await hotspotUserResponse.json();
    return hotspotUser;
};
