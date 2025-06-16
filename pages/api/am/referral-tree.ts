import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { prisma } from '@/lib/prisma';

interface ReferralNode {
  id: string;
  name: string;
  email: string;
  level: number;
  children: ReferralNode[];
}

interface DirectReferral {
  id: string;
  name: string | null;
  email: string | null;
}

async function buildTree(userId: string, level: number = 1): Promise<ReferralNode | null> {
  if (level > 10) return null;

  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      directReferrals: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });

  if (!user) return null;

  const children = await Promise.all(
    user.directReferrals.map((ref: DirectReferral) => buildTree(ref.id, level + 1))
  );

  return {
    id: user.id,
    name: user.name || '',
    email: user.email || '',
    level,
    children: children.filter((child): child is ReferralNode => child !== null),
  };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const tree = await buildTree(session.user.id);

    if (!tree) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.status(200).json(tree);
  } catch (error) {
    console.error('Error building referral tree:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
