export const getHotspotActiveUserByPhone = async (phone) => {
    const activeHotspotUserResponse = await fetch(
        `${process.env.BASE_URL}/api/mikrotik/hotspot/getActiveUserByUsername?phone=${phone}`,
        {
            next: {
                revalidate: 10
            }
        }
    );
    const activeHotspotUser = await activeHotspotUserResponse.json();
    return activeHotspotUser;
};

export const getHotspotUserByPhone = async (phone) => {
    const hotspotUserResponse = await fetch(
        `${process.env.BASE_URL}/api/mikrotik/hotspot/getUserByUsername?phone=${phone}`,
        {
            next: {
                revalidate: 10
            }
        }
    );
    const hotspotUser = await hotspotUserResponse.json();
    return hotspotUser;
};
