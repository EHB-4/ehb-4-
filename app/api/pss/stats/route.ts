export const runtime = "nodejs";
import { NextResponse } from 'next/server';
import { PSSDatabase } from '@/lib/pss/database';

// GET /api/pss/stats
export async function GET() {
  try {
    const stats = await PSSDatabase.getStats();

    return NextResponse.json({
      success: true,
      data: stats,
    });
  } catch (error) {
    console.error('GET /api/pss/stats error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch dashboard statistics' },
      { status: 500 }
    );
  }
}
