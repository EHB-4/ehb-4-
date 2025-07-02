import { NextResponse } from 'next/server';

/**
 * GET /api/affiliate/stats
 * Get affiliate statistics for the current user
 */
export async function GET(request: Request) {
  try {
    // Mock data - in real implementation, fetch from database
    const stats = {
      totalReferrals: 47,
      activeReferrals: 32,
      conversionRate: 68.1,
      totalEarnings: 2847.5,
      monthlyEarnings: 847.3,
      sqlLevel: 'Normal',
      commissionRate: 6,
      lockedCoins: 1500,
      loyaltyBonus: 0.8,
      referralTree: [
        { id: 1, name: 'John Doe', level: 1, earnings: 120, status: 'active', sqlLevel: 'Basic' },
        { id: 2, name: 'Jane Smith', level: 1, earnings: 85, status: 'active', sqlLevel: 'Normal' },
        { id: 3, name: 'Mike Johnson', level: 2, earnings: 45, status: 'active', sqlLevel: 'Free' },
        {
          id: 4,
          name: 'Sarah Wilson',
          level: 2,
          earnings: 62,
          status: 'inactive',
          sqlLevel: 'Basic',
        },
      ],
      achievements: [
        { id: 1, name: 'First Referral', description: 'Get your first referral', earned: true },
        { id: 2, name: 'Bronze Level', description: '10+ active referrals', earned: true },
        { id: 3, name: 'Silver Level', description: '50+ active referrals', earned: false },
        { id: 4, name: 'Gold Level', description: '200+ active referrals', earned: false },
      ],
      commissionLevels: [
        { level: 1, rate: 10, description: 'Direct referrals' },
        { level: 2, rate: 5, description: 'Second level' },
        { level: 3, rate: 2, description: 'Third level' },
        { level: 4, rate: 1, description: 'Fourth level' },
        { level: 5, rate: 1, description: 'Fifth level' },
      ],
      sqlLevels: [
        { name: 'Free', multiplier: 0.5, bonus: 2, required: 'Signup via referral' },
        { name: 'Basic', multiplier: 1.0, bonus: 4, required: 'KYC + 1 referral' },
        { name: 'Normal', multiplier: 1.2, bonus: 6, required: 'Lock 500 EHBGC' },
        { name: 'High', multiplier: 1.5, bonus: 8, required: 'Lock 1500 EHBGC' },
        { name: 'VIP', multiplier: 2.0, bonus: 10, required: 'Lock 5000 EHBGC' },
      ],
    };

    return NextResponse.json({ success: true, data: stats });
  } catch (error) {
    console.error('Error fetching affiliate stats:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch affiliate statistics' },
      { status: 500 }
    );
  }
}
