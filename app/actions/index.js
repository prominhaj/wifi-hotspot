'use server';

import { redirect } from 'next/navigation';

export const redirectPath = async (path) => {
    redirect(path);
};
