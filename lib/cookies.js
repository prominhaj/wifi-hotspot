'use server';

import { cookies } from 'next/headers';

export const getCookies = async (name) => {
    return cookies().get(name)?.value;
};

export const setCookies = async (name, value, options = {}) => {
    return cookies().set(name, value, { ...options, sameSite: 'strict' });
};

export const deleteCookies = async (name) => {
    return cookies().delete(name, { sameSite: 'strict' });
};
