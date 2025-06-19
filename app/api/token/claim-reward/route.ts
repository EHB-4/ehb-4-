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

    const contract = await getContract();

    // Check if user has any rewards to claim
    const pendingRewards = await contract.getPendingRewards();
    if (pendingRewards <= ethers.parseEther('0')) {
      return NextResponse.json({ error: 'No rewards available to claim' }, { status: 400 });
    }

    const tx = await contract.claimReward();
    await tx.wait();

    return NextResponse.json({ success: true, transactionHash: tx.hash });
  } catch (error) {
    console.error('Error in claim-reward endpoint:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
