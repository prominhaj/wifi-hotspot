import axios from 'axios';

export const bkashAuth = async (req, res) => {
    try {
        const { data } = await axios.post(
            process.env.BKASH_GRANT_TOKEN_URL,
            {
                app_key: process.env.BKASH_API_KEY,
                app_secret: process.env.BKASH_SECRET_KEY
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    username: process.env.BKASH_USERNAME,
                    password: process.env.BKASH_PASSWORD
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
