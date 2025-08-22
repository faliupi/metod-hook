// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Only apply middleware for API routes
  if (request.nextUrl.pathname.startsWith('/api/')) {
    // Retrieve the access token from the cookies
    const accessToken = request.cookies.get('accessToken')?.value;

    // Clone the headers of the incoming request
    const headers = new Headers(request.headers);

    // If an access token is present, set it in the Authorization header
    if (accessToken) {
      headers.set('Authorization', `Bearer ${accessToken}`);
    }

    // Pass the modified headers along with the request
    return NextResponse.next({
      request: {
        headers,
      },
    });
  }

  return NextResponse.next();
}

// Apply middleware only to routes that start with `/api`
export const config = {
  matcher: '/api/:path*',
};
