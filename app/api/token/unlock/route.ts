export const runtime = 'nodejs';
import { ethers } from 'ethers';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

import { authOptions } from '@/lib/auth';
import { getContract } from '@/lib/contracts';

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { amount } = body;

    if (!amount) {
      return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 });
    }

    // Validate amount is a positive number
    const amountBN = ethers.parseEther(amount.toString());
    if (amountBN <= ethers.parseEther('0')) {
      return NextResponse.json({ error: 'Amount must be greater than 0' }, { status: 400 });
    }

    const contract = await getContract();
    const tx = await contract.unlock(amountBN);
    await tx.wait();

    return NextResponse.json({ success: true, transactionHash: tx.hash });
  } catch (error) {
    console.error('Error in unlock endpoint:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
