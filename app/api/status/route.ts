export const runtime = 'nodejs';
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    message: 'EHB system is running',
    timestamp: new Date().toISOString(),
  });
}
