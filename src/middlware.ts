import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

// Default export for next-auth middleware
export { default } from 'next-auth/middleware';

export async function middleware(request: NextRequest) {
    const token = await getToken({ req: request });
    const url = request.nextUrl;

    // Check if the token exists and if the user is verified
    const isUserVerified = token?.isVerified;

    // Define paths accessible by unverified users
    const unverifiedUserPaths = ['/sign-in', '/sign-up', '/home', '/teachers','/profile'];

    if (token) {
        // If the user is verified, allow access to all routes
        if (isUserVerified || !unverifiedUserPaths.includes(url.pathname)) {
            return NextResponse.next();
        }

        // Redirect unverified users from restricted routes
        return NextResponse.redirect(new URL('/home', request.url));
    } else {
        // Handle routes for unauthenticated users
        if (unverifiedUserPaths.includes(url.pathname)) {
            return NextResponse.next();
        }

        // Redirect unauthenticated users to the sign-in page
        return NextResponse.redirect(new URL('/sign-in', request.url));
    }
}

export const config = {
    matcher: [
        '/sign-in',
        '/sign-up',
        '/',
        '/dashboard/:path*',
        '/verify/:path*',
        '/teachers',
        '/home'
        
    ]
};
