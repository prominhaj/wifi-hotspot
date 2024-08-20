import { NextResponse, userAgent } from 'next/server';
import { decrypt } from './lib/session';
import { textEncrypt } from './lib/hash';

const protectedRoutes = ['/', '/payment', '/payment/history', '/statistic', '/profile'];
const publicRoutes = ['/login', '/register', '/register/verify'];

export default async function middleware(req) {
    const path = req.nextUrl.pathname;
    const isProtectedRoute = protectedRoutes.includes(path);
    const isPublicRoute = publicRoutes.includes(path);

    // Check Device Name
    const { device } = userAgent(req);
    const viewport = device.type === 'mobile' ? 'mobile' : 'desktop';
    const encryptedDeviceName = textEncrypt(viewport);

    // Set the encrypted device name in cookies
    const response = NextResponse.next();
    response.cookies.set('device', encryptedDeviceName, { httpOnly: true, secure: true });

    const cookie = req.cookies.get('session')?.value;
    const session = await decrypt(cookie);

    if (isProtectedRoute && !session?.userId) {
        return NextResponse.redirect(new URL(`/login?redirectUrl=${path}`, req.nextUrl));
    }

    if (isPublicRoute && session?.userId) {
        return NextResponse.redirect(new URL(`/`, req.nextUrl));
    }

    return response;
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)']
};
