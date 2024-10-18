// src/utils/encryption.js
import CryptoJS from 'crypto-js';

const SECRET_KEY = 'nitesh'

export const encryptPath = (path) => {
    return CryptoJS.AES.encrypt(path, SECRET_KEY).toString();
};

export const decryptPath = (cipherText) => {
    const bytes = CryptoJS.AES.decrypt(cipherText, SECRET_KEY);
    return bytes.toString(CryptoJS.enc.Utf8);
};
