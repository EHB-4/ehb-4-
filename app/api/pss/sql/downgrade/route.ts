export const runtime = 'nodejs';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  // Purana logic yahan migrate karen
  return NextResponse.json({ message: 'Downgrade migrated (TODO: real logic)' });
}
