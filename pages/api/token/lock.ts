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

    const { amount, lockDuration } = req.body;

    if (!amount || !lockDuration) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }

    // Validate amount is a positive number
    const amountBN = ethers.parseEther(amount.toString());
    if (amountBN <= ethers.parseEther('0')) {
      return res.status(400).json({ error: 'Amount must be greater than 0' });
    }

    // Validate lock duration is a positive number
    if (lockDuration <= 0) {
      return res.status(400).json({ error: 'Lock duration must be greater than 0' });
    }

    const contract = await getContract();
    const tx = await contract.lock(amountBN, lockDuration);
    await tx.wait();

    return res.status(200).json({ success: true, transactionHash: tx.hash });
  } catch (error) {
    console.error('Error in lock endpoint:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
} 