export const runtime = 'nodejs';
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    message: 'EHB API is working!',
    timestamp: new Date().toISOString(),
    status: 'success',
  });
}
