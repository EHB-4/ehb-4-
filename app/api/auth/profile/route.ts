export const runtime = 'nodejs';
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Mock user database - in production, this would be a real database
const users: any[] = [
  {
    id: '1',
    email: 'admin@ehb.com',
    password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
    firstName: 'Admin',
    lastName: 'User',
    role: 'admin',
    isVerified: true,
    phone: '+1 (555) 123-4567',
    company: 'EHB Corporation',
    avatar: null,
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-15T10:30:00Z',
  },
  {
    id: '2',
    email: 'user@ehb.com',
    password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
    firstName: 'Regular',
    lastName: 'User',
    role: 'user',
    isVerified: true,
    phone: '+1 (555) 987-6543',
    company: 'Tech Solutions',
    avatar: null,
    createdAt: '2024-01-20T14:15:00Z',
    updatedAt: '2024-01-20T14:15:00Z',
  },
];

export async function PUT(request: NextRequest) {
  try {
    // Get token from cookie
    const token = request.cookies.get('auth-token')?.value;

    if (!token) {
      return NextResponse.json({ error: 'No authentication token found' }, { status: 401 });
    }

    // Verify token
    let decoded;
    try {
      decoded = jwt.verify(token, JWT_SECRET) as any;
    } catch (error) {
      return NextResponse.json({ error: 'Invalid or expired token' }, { status: 401 });
    }

    // Get update data
    const updateData = await request.json();
    const { firstName, lastName, email, phone, company, avatar } = updateData;

    // Find user
    const userIndex = users.findIndex(u => u.id === decoded.userId);
    if (userIndex === -1) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Validate email if it's being updated
    if (email && email !== users[userIndex].email) {
      // Check if email is already taken
      const emailExists = users.find(u => u.email === email && u.id !== decoded.userId);
      if (emailExists) {
        return NextResponse.json({ error: 'Email address is already in use' }, { status: 409 });
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return NextResponse.json({ error: 'Please enter a valid email address' }, { status: 400 });
      }
    }

    // Update user data
    const updatedUser = {
      ...users[userIndex],
      ...(firstName && { firstName }),
      ...(lastName && { lastName }),
      ...(email && { email }),
      ...(phone !== undefined && { phone }),
      ...(company !== undefined && { company }),
      ...(avatar !== undefined && { avatar }),
      updatedAt: new Date().toISOString(),
    };

    users[userIndex] = updatedUser;

    // Return updated user data (without password)
    const userData = {
      id: updatedUser.id,
      email: updatedUser.email,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      role: updatedUser.role,
      isVerified: updatedUser.isVerified,
      phone: updatedUser.phone,
      company: updatedUser.company,
      avatar: updatedUser.avatar,
      createdAt: updatedUser.createdAt,
      updatedAt: updatedUser.updatedAt,
    };

    return NextResponse.json({
      success: true,
      message: 'Profile updated successfully',
      user: userData,
    });
  } catch (error) {
    console.error('Profile update error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
