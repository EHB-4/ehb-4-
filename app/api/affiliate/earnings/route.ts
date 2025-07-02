import { NextResponse } from 'next/server';

/**
 * GET /api/affiliate/earnings
 * Get earnings breakdown for the affiliate
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const period = searchParams.get('period') || 'month'; // month, year, all

    // Mock earnings data
    const earnings = {
      total: 2847.5,
      monthly: 847.3,
      breakdown: {
        directCommissions: 1993.25, // 70%
        loyaltyBonuses: 569.5, // 20%
        sqlLevelBonus: 284.75, // 10%
      },
      history: [
        { date: '2024-01', amount: 847.3, referrals: 12 },
        { date: '2024-02', amount: 923.45, referrals: 15 },
        { date: '2024-03', amount: 1076.75, referrals: 18 },
      ],
      pending: 156.8,
      withdrawn: 2690.7,
    };

    return NextResponse.json({ success: true, data: earnings });
  } catch (error) {
    console.error('Error fetching earnings:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch earnings' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/affiliate/earnings/withdraw
 * Withdraw earnings
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { amount, walletAddress, userId } = body;

    if (!amount || !walletAddress || !userId) {
      return NextResponse.json(
        { success: false, error: 'Amount, wallet address, and user ID are required' },
        { status: 400 }
      );
    }

    if (amount <= 0) {
      return NextResponse.json(
        { success: false, error: 'Amount must be greater than 0' },
        { status: 400 }
      );
    }

    // Mock withdrawal processing
    const withdrawal = {
      id: `wd_${Date.now()}`,
      amount,
      walletAddress,
      userId,
      status: 'pending',
      createdAt: new Date().toISOString(),
      processedAt: null,
    };

    // In real implementation, process withdrawal via blockchain
    // await processWithdrawal(withdrawal);

    return NextResponse.json({
      success: true,
      data: withdrawal,
      message: 'Withdrawal request submitted successfully',
    });
  } catch (error) {
    console.error('Error processing withdrawal:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process withdrawal' },
      { status: 500 }
    );
  }
}
