import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  try {
    // Create a new request with basic headers
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set(
      'x-request-id',
      `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    );

    const modifiedRequest = new NextRequest(request, {
      headers: requestHeaders,
    });

    // Continue with the request
    const response = NextResponse.next({
      request: modifiedRequest,
    });

    // Add basic security headers
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('X-Frame-Options', 'DENY');
    response.headers.set('X-XSS-Protection', '1; mode=block');

    return response;
  } catch (error) {
    // Handle any errors in middleware
    console.error('Middleware error:', error);

    // Return a generic error response
    return NextResponse.json(
      {
        success: false,
        error: {
          type: 'MIDDLEWARE_ERROR',
          message: 'An error occurred while processing the request',
          code: 'MIDDLEWARE_ERROR',
          timestamp: new Date().toISOString(),
        },
      },
      { status: 500 }
    );
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public/).*)',
  ],
};
