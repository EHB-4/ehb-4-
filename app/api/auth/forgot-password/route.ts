export const runtime = "nodejs";
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Mock user database - in production, this would be a real database
const users = [
  {
    id: '1',
    email: 'admin@ehb.com',
    password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
    firstName: 'Admin',
    lastName: 'User',
    role: 'admin',
    isVerified: true,
  },
  {
    id: '2',
    email: 'user@ehb.com',
    password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
    firstName: 'Regular',
    lastName: 'User',
    role: 'user',
    isVerified: true,
  },
];

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    // Validate input
    if (!email) {
      return NextResponse.json({ error: 'Email address is required' }, { status: 400 });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Please enter a valid email address' }, { status: 400 });
    }

    // Find user
    const user = users.find(u => u.email === email);

    // Always return success to prevent email enumeration attacks
    // In production, you would send an email if the user exists
    if (user) {
      // Generate password reset token
      const resetToken = jwt.sign(
        {
          userId: user.id,
          email: user.email,
          type: 'password-reset',
        },
        JWT_SECRET,
        { expiresIn: '1h' }
      );

      // In production, send email with reset link
      console.log('Password reset email would be sent to:', email);
      console.log('Reset token:', resetToken);
      console.log(
        'Reset link:',
        `${process.env.NEXT_PUBLIC_APP_URL}/auth/reset-password?token=${resetToken}`
      );
    }

    return NextResponse.json({
      success: true,
      message: 'If an account with that email exists, password reset instructions have been sent.',
    });
  } catch (error) {
    console.error('Forgot password error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
