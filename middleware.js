import { NextResponse } from 'next/server';
import { decrypt } from './lib/session';

const protectedRoutes = [
    '/',
    '/payment',
    '/payment/history',
    '/upload-image',
    '/statistic',
    '/profile',
    '/dashboard'
];
const publicRoutes = ['/login', '/register', '/register/verify'];

export default async function middleware(req) {
    const path = req.nextUrl.pathname;
    const isProtectedRoute = protectedRoutes.includes(path);
    const isPublicRoute = publicRoutes.includes(path);

    const cookie = req.cookies.get('session')?.value;
    const session = await decrypt(cookie);

    if (isProtectedRoute && !session?.userId) {
        return NextResponse.redirect(new URL(`/login?redirectUrl=${path}`, req.nextUrl));
    }

    if (isPublicRoute && session?.userId) {
        return NextResponse.redirect(new URL(`/`, req.nextUrl));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)']
};
