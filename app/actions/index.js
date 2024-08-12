'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

export const redirectPath = async (path) => {
    redirect(path);
};

export const refreshPath = async (path) => {
    revalidatePath(path);
};
