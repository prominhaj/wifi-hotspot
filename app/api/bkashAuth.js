import axios from 'axios';

export const bkashAuth = async (req, res) => {
    try {
        const { data } = await axios.post(
            process.env.bkash_grant_token_url,
            {
                app_key: process.env.bkash_api_key,
                app_secret: process.env.bkash_secret_key
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    username: process.env.bkash_username,
                    password: process.env.bkash_password
                }
            }
        );

        req.id_token = data.id_token;
        return true;
    } catch (error) {
        res.status(401).json({ error: error.message });
        return false;
    }
};
