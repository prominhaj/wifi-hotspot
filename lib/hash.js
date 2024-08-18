import CryptoJS from 'crypto-js';

const secretKey = process.env.NEXT_PUBLIC_SECRET_KEY;

// Encryption
export function textEncrypt(text) {
    return CryptoJS.AES.encrypt(text, secretKey).toString();
}

// Decryption
export function textDecrypt(ciphertext) {
    const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
}
