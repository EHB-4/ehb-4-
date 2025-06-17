import { NextResponse } from 'next/server';

export async function GET() {
  // Purana logic yahan migrate karen
  return NextResponse.json({ message: 'Referral Tree migrated (TODO: real logic)' });
}
