import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

import { prisma } from '@/lib/prisma';

declare module 'next' {
  interface NextApiRequest {
    user?: {
      id: string;
      role: string;
      sqlLevel?: string;
    };
  }
}

interface SQLLevelConfig {
  minLevel: number;
  requireActive?: boolean;
  requireLoyaltyLock?: boolean;
  checkWalletBalance?: boolean;
  minWalletBalance?: number;
}

export default async function checkSQLLevel(
  req: NextApiRequest,
  res: NextApiResponse,
  next: () => void
) {
  try {
    const session = await getSession({ req });

    if (!session) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        id: true,
        role: true,
        sqlLevel: true,
      },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('SQL Level check error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

// Export common configurations
export const sqlLevelConfigs = {
  basic: {
    minLevel: 1,
    requireActive: true,
  },
  intermediate: {
    minLevel: 2,
    requireActive: true,
    requireLoyaltyLock: true,
  },
  advanced: {
    minLevel: 3,
    requireActive: true,
    requireLoyaltyLock: true,
    checkWalletBalance: true,
    minWalletBalance: 1000,
  },
  premium: {
    minLevel: 4,
    requireActive: true,
    requireLoyaltyLock: true,
    checkWalletBalance: true,
    minWalletBalance: 5000,
  },
  elite: {
    minLevel: 5,
    requireActive: true,
    requireLoyaltyLock: true,
    checkWalletBalance: true,
    minWalletBalance: 10000,
  },
};
