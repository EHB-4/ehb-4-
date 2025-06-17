import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

// Define protected routes that require authentication
const protectedRoutes = ['/dashboard', '/profile', '/wallet', '/admin', '/franchise', '/verify'];

// Define admin-only routes
const adminRoutes = ['/admin', '/api/admin'];

// Define allowed origins for CORS
const allowedOrigins = ['http://localhost:3000', 'https://your-production-domain.com'];

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const isAuthPage =
    request.nextUrl.pathname.startsWith('/login') ||
    request.nextUrl.pathname.startsWith('/register');

  if (isAuthPage) {
    if (token) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
    return NextResponse.next();
  }

  if (!token) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('callbackUrl', request.url);
    return NextResponse.redirect(loginUrl);
  }

  // Check for admin routes
  if (request.nextUrl.pathname.startsWith('/admin')) {
    if (token.role !== 'admin') {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  }

  // Check if the route is protected
  const isProtectedRoute = protectedRoutes.some(route =>
    request.nextUrl.pathname.startsWith(route)
  );

  // Check if the route is admin-only
  const isAdminRoute = adminRoutes.some(route => request.nextUrl.pathname.startsWith(route));

  if (isProtectedRoute && !token) {
    // Redirect to login if trying to access protected route while not authenticated
    const loginUrl = new URL('/auth/login', request.url);
    loginUrl.searchParams.set('callbackUrl', request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  // If it's an admin route, check for admin role
  if (isAdminRoute && (!token || token.role !== 'admin')) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  // Add security headers
  const response = NextResponse.next();

  // Add CORS headers
  const origin = request.headers.get('origin');
  if (origin && allowedOrigins.includes(origin)) {
    response.headers.set('Access-Control-Allow-Origin', origin);
  }
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  response.headers.set('Access-Control-Max-Age', '86400');

  // Add security headers
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; font-src 'self'; connect-src 'self';"
  );
  response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  response.headers.set('X-XSS-Protection', '1; mode=block');

  return response;
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/admin/:path*',
    '/login',
    '/register',
    '/profile/:path*',
  ],
};
