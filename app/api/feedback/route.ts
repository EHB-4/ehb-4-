export const runtime = "nodejs";
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { feedback } = await req.json();
  console.log('User Feedback:', feedback);
  // Here you could email, store in DB, etc.
  return NextResponse.json({ success: true });
}
