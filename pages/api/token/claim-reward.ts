import { NextApiRequest, NextApiResponse } from 'next';
import { ethers } from 'ethers';
import { getContract } from '@/lib/contracts';
import { getSession } from 'next-auth/react';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const session = await getSession({ req });
    if (!session) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const contract = await getContract();

    // Check if user has any rewards to claim
    const pendingRewards = await contract.getPendingRewards();
    if (pendingRewards <= ethers.parseEther('0')) {
      return res.status(400).json({ error: 'No rewards available to claim' });
    }

    const tx = await contract.claimReward();
    await tx.wait();

    return res.status(200).json({ success: true, transactionHash: tx.hash });
  } catch (error) {
    console.error('Error in claim-reward endpoint:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
