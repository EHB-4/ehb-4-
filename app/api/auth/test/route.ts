export const runtime = "nodejs";
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';

import { authOptions } from '@/lib/auth';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({
        status: 'unauthenticated',
        message: 'No active session',
      });
    }

    return NextResponse.json({
      status: 'authenticated',
      message: 'Authentication working',
      session,
    });
  } catch (error) {
    console.error('Authentication test error:', error);
    return NextResponse.json(
      {
        status: 'error',
        message: 'Authentication test failed',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
