import { NextResponse } from 'next/server';

export async function GET() {
  // Purana logic yahan migrate karen
  return NextResponse.json({ message: 'Get Level migrated (TODO: real logic)' });
}
