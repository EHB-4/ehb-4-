import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  // Purana logic yahan migrate karen
  return NextResponse.json({ message: 'Upload Document migrated (TODO: real logic)' });
}
