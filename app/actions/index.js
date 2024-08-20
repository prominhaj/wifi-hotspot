'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { deleteSession } from '@/lib/session';

export const redirectPath = async (path) => {
    redirect(path);
};

export const refreshPath = async () => {
    revalidatePath('/');
};

export const logout = async () => {
    deleteSession();
    redirect('/login');
};
