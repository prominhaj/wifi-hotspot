export const loginHotspotUser = async (username, password) => {
    const url = `${process.env.NEXT_PUBLIC_MIKROTIK_LOGIN_DNS_IP}/login?username=${username}&password=${password}`;

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        if (response.ok) {
            return {
                success: true,
                message: 'Login successful'
            };
        } else {
            return {
                success: false,
                message: 'Invalid credentials'
            };
        }
    } catch (error) {
        throw new Error(`Login failed: ${error.message}`);
    }
};
