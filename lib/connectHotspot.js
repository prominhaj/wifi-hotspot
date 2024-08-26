import axios from 'axios';

export const loginHotspotUser = async (username, password) => {
    const url = `${process.env.NEXT_PUBLIC_MIKROTIK_LOGIN_DNS_IP}/login?username=${username}&password=${password}`;

    try {
        const response = await axios.get(url, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        if (response.data.ok) {
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
