import { NextResponse } from 'next/server';

export async function GET() {
  // Purana logic yahan migrate karen
  return NextResponse.json({ message: 'Health DB migrated (TODO: real logic)' });
}
