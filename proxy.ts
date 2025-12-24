// middleware.ts

import { NextResponse} from 'next/server';
import type { NextRequest } from 'next/server';
 
// Main Middleware function
export function proxy(request: NextRequest) {
    
        const { pathname } = request.nextUrl;

        // Only guard dashboard routes
        if (!pathname.startsWith("/dashboard")) {
            return NextResponse.next();
        }

        // Check for refresh token cookie (existence only)
        const hasRefreshToken = request.cookies.has("refresh");

        if (!hasRefreshToken) {
            const loginUrl = new URL("/login", request.url);
            return NextResponse.redirect(loginUrl);
        }

        return NextResponse.next();
}



export const config = {
  matcher: ["/dashboard/:path*"],
};
