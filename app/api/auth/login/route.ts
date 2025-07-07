export const runtime = 'nodejs';
import { NextRequest, NextResponse } from 'next/server';
import { authService } from '@/lib/auth';
import { emailService } from '@/lib/email';
import { db } from '@/lib/database';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, rememberMe } = body;

    // Validate input
    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Please enter a valid email address' }, { status: 400 });
    }

    // Attempt login
    const { user, tokens } = await authService.login({ email, password });

    // Create response
    const response = NextResponse.json({
      success: true,
      message: 'Login successful',
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        verified: user.verified,
      },
      tokens: {
        accessToken: tokens.accessToken,
        expiresIn: tokens.expiresIn,
      },
    });

    // Set HTTP-only cookies
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax' as const,
      maxAge: rememberMe ? 30 * 24 * 60 * 60 : 7 * 24 * 60 * 60, // 30 days or 7 days
    };

    response.cookies.set('accessToken', tokens.accessToken, cookieOptions);
    response.cookies.set('refreshToken', tokens.refreshToken, cookieOptions);

    // Log successful login
    console.log(`✅ User ${user.email} logged in successfully`);

    return response;
  } catch (error: any) {
    console.error('❌ Login failed:', error);

    // Handle specific errors
    if (error.message === 'Invalid email or password') {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    if (error.message === 'Account is deactivated') {
      return NextResponse.json(
        { error: 'Your account has been deactivated. Please contact support.' },
        { status: 403 }
      );
    }

    // Generic error response
    return NextResponse.json({ error: 'Login failed. Please try again.' }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}
