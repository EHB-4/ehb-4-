import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { prisma } from '@/lib/prisma';

interface Earning {
  timestamp: Date;
  amount: number;
  type: string;
}

interface IncomeSummary {
  currentMonth: {
    total: number;
    breakdown: {
      type: string;
      amount: number;
    }[];
  };
  lastMonth: {
    total: number;
    breakdown: {
      type: string;
      amount: number;
    }[];
  };
  monthlyBreakdown: {
    month: string;
    total: number;
  }[];
  recentTransactions: {
    timestamp: Date;
    amount: number;
    type: string;
  }[];
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
    const now = new Date();
    const startOfCurrentMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0);

    const earnings = await prisma.earning.findMany({
      where: {
        userId: session.user.id,
        timestamp: {
          gte: startOfLastMonth,
        },
      },
      orderBy: {
        timestamp: 'desc',
      },
    });

    const currentMonthEarnings = earnings.filter(
      (earning: Earning) => earning.timestamp >= startOfCurrentMonth
    );

    const lastMonthEarnings = earnings.filter(
      (earning: Earning) =>
        earning.timestamp >= startOfLastMonth &&
        earning.timestamp <= endOfLastMonth
    );

    const currentMonthTotal = currentMonthEarnings.reduce(
      (sum: number, earning: Earning) => sum + earning.amount,
      0
    );

    const lastMonthTotal = lastMonthEarnings.reduce(
      (sum: number, earning: Earning) => sum + earning.amount,
      0
    );

    const currentMonthBreakdown = Object.entries(
      currentMonthEarnings.reduce((acc: Record<string, number>, earning: Earning) => {
        acc[earning.type] = (acc[earning.type] || 0) + earning.amount;
        return acc;
      }, {})
    ).map(([type, amount]) => ({ type, amount: amount as number }));

    const lastMonthBreakdown = Object.entries(
      lastMonthEarnings.reduce((acc: Record<string, number>, earning: Earning) => {
        acc[earning.type] = (acc[earning.type] || 0) + earning.amount;
        return acc;
      }, {})
    ).map(([type, amount]) => ({ type, amount: amount as number }));

    const monthlyBreakdown = Array.from({ length: 6 }, (_, i) => {
      const month = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthEarnings = earnings.filter(
        (earning: Earning) =>
          earning.timestamp.getMonth() === month.getMonth() &&
          earning.timestamp.getFullYear() === month.getFullYear()
      );
      return {
        month: month.toLocaleString('default', { month: 'short', year: 'numeric' }),
        total: monthEarnings.reduce((sum: number, earning: Earning) => sum + earning.amount, 0),
      };
    }).reverse();

    const summary: IncomeSummary = {
      currentMonth: {
        total: currentMonthTotal,
        breakdown: currentMonthBreakdown,
      },
      lastMonth: {
        total: lastMonthTotal,
        breakdown: lastMonthBreakdown,
      },
      monthlyBreakdown,
      recentTransactions: earnings.slice(0, 10).map((earning: Earning) => ({
        timestamp: earning.timestamp,
        amount: earning.amount,
        type: earning.type,
      })),
    };

    return res.status(200).json(summary);
  } catch (error) {
    console.error('Error fetching income summary:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
