import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname, host } = request.nextUrl;

  // Only apply to root path
  if (pathname === '/') {
    // Port 8080 -> Development Portal
    if (host.includes(':8080')) {
      console.log('Redirecting port 8080 to /development-portal');
      return NextResponse.redirect(new URL('/development-portal', request.url));
    }

    // Port 5000 -> Admin Panel
    if (host.includes(':5000')) {
      console.log('Redirecting port 5000 to /admin-panel');
      return NextResponse.redirect(new URL('/admin-panel', request.url));
    }

    // Port 3000 -> Home page (default)
    if (host.includes(':3000') || host === 'localhost') {
      console.log('Port 3000 - staying on home page');
      return NextResponse.next();
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/'],
};
