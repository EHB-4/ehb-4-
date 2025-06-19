import { NextResponse } from 'next/server';

import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // Test database connection by finding a user count
    const count = await prisma.user.count();

    return NextResponse.json({
      status: 'ok',
      message: 'Database connection successful',
      userCount: count,
    });
  } catch (error) {
    console.error('Database connection error:', error);
    return NextResponse.json(
      {
        status: 'error',
        message: 'Database connection failed',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
