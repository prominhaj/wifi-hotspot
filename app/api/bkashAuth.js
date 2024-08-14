export const bkashAuth = async (req, res) => {
    try {
        const response = await fetch(process.env.BKASH_GRANT_TOKEN_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                username: process.env.BKASH_USERNAME,
                password: process.env.BKASH_PASSWORD
            },
            body: JSON.stringify({
                app_key: process.env.BKASH_API_KEY,
                app_secret: process.env.BKASH_SECRET_KEY
            })
        });

        if (!response.ok) {
            throw new Error(`Authentication failed: ${response.statusText}`);
        }

        const data = await response.json();
        req.id_token = data.id_token;
        return true;
    } catch (error) {
        res.status(401).json({ error: error.message });
        return false;
    }
};
