import { NextResponse } from 'next/server';

export async function GET() {
  // Purana logic yahan migrate karen
  return NextResponse.json({ message: 'Progress migrated (TODO: real logic)' });
}
