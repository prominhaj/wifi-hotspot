import { NextResponse, userAgent } from 'next/server';
import { cookies } from 'next/headers';
import { decrypt } from './lib/session';

const protectedRoutes = ['/dashboard', '/payment'];
const publicRoutes = ['/login', '/register', '/register/verify', '/'];

export default async function middleware(req) {
    const path = req.nextUrl.pathname;
    const isProtectedRoute = protectedRoutes.includes(path);
    const isPublicRoute = publicRoutes.includes(path);

    const { device } = userAgent(req);
    const viewport = device.type === 'mobile' ? 'mobile' : 'desktop';

    const cookie = cookies().get('session')?.value;
    const session = await decrypt(cookie);

    if (isProtectedRoute && !session?.userId) {
        return NextResponse.redirect(new URL(`/login?redirectUrl=${path}`, req.nextUrl));
    }

    if (isPublicRoute && session?.userId && !req.nextUrl.pathname.startsWith('/dashboard')) {
        return NextResponse.redirect(new URL(`/dashboard?device=${viewport}`, req.nextUrl));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)']
};
