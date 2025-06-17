import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

// TODO: Replace with real DB integration
let mockSettings = {
  language: 'en',
  notifications: true,
  theme: 'light',
};

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    // TODO: Fetch settings from DB using session.user.id
    return NextResponse.json({ settings: mockSettings });
  } catch (error) {
    console.error('Error fetching user settings:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const body = await request.json();
    // TODO: Validate and update settings in DB using session.user.id
    mockSettings = { ...mockSettings, ...body };
    return NextResponse.json({ success: true, settings: mockSettings });
  } catch (error) {
    console.error('Error updating user settings:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 