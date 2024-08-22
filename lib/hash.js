import 'server-only';
import CryptoJS from 'crypto-js';
import { cookies } from 'next/headers';

const secretKey = process.env.DEVICE_SECRET_KEY;

// Encryption
export function textEncrypt(text) {
    return CryptoJS.AES.encrypt(text, secretKey).toString();
}

// Decryption
export function textDecrypt(ciphertext) {
    const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
}

export const getDevice = () => {
    const device = cookies().get('device')?.value;
    const deviceDecrypt = textDecrypt(device);
    return deviceDecrypt;
};
