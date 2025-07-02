export const runtime = "nodejs";
import { NextResponse } from 'next/server';

export async function GET() {
  // In a real app, check session/cookie/token here
  return NextResponse.json({
    authenticated: false,
    user: null,
    status: 'guest',
    timestamp: new Date().toISOString(),
  });
}
