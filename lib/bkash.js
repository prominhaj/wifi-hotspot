import BkashGateway from 'bkash-payment-gateway';

const bkashConfig = {
    baseURL: process.env.BKASH_BASE_URL,
    key: process.env.BKASH_APP_KEY,
    username: process.env.BKASH_USERNAME,
    password: process.env.BKASH_PASSWORD,
    secret: process.env.BKASH_SERECT_KEY
};

const bkash = new BkashGateway(bkashConfig);
export default bkash;
