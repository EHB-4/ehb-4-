export const runtime = 'nodejs';
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: {
        sqlProfile: true,
        coinLocks: {
          where: { status: 'ACTIVE' },
          orderBy: { createdAt: 'desc' },
        },
        skillTests: {
          orderBy: { createdAt: 'desc' },
          take: 5,
        },
      },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Calculate AI score based on various factors
    const aiScore = calculateAIScore(user);

    // Get current level benefits and restrictions
    const levelConfig = getLevelConfig(user.sqlLevel);

    // Check if user is eligible for upgrade
    const upgradeEligibility = checkUpgradeEligibility(user, aiScore);

    const response = {
      currentLevel: user.sqlLevel,
      issuedBy: user.sqlIssuedBy || 'System',
      issuedAt: user.sqlVerifiedAt?.toISOString() || user.createdAt.toISOString(),
      expiryDate: user.sqlExpiryDate?.toISOString(),
      verificationStatus: getVerificationStatus(user),
      benefits: levelConfig.benefits,
      restrictions: levelConfig.restrictions,
      aiScore,
      fraudScore: user.fraudScore,
      complaintCount: user.complaintCount,
      badgeNftHash: user.badgeNftHash,
      upgradeEligibility,
      activeCoinLocks: user.coinLocks.length,
      totalLockedAmount: user.coinLocks.reduce((sum, lock) => sum + lock.amount, 0),
      recentSkillTests: user.skillTests.map(test => ({
        type: test.testType,
        score: test.score,
        passed: test.passed,
        date: test.createdAt.toISOString(),
      })),
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('SQL Get Level Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

function calculateAIScore(user: any): number {
  let score = 0;

  // Base score from referrals (if any)
  score += 25; // Placeholder for referral system

  // Score from skill tests
  const passedTests = user.skillTests.filter((test: any) => test.passed).length;
  score += passedTests * 20;

  // Score from coin locks
  const totalLocked = user.coinLocks.reduce((sum: number, lock: any) => sum + lock.amount, 0);
  score += Math.min(totalLocked / 100, 15); // Max 15 points from coin locks

  // Penalty from complaints
  score -= user.complaintCount * 10;

  // Penalty from fraud score
  if (user.fraudScore > 0.7) {
    score *= 0.5;
  }

  return Math.max(0, Math.min(500, Math.round(score)));
}

function getLevelConfig(level: number) {
  const configs = {
    0: {
      benefits: ['Basic marketplace access', 'Standard transaction limits'],
      restrictions: ['No franchise access', 'Limited features'],
    },
    1: {
      benefits: ['Enhanced marketplace access', 'Franchise eligibility', 'Basic AI tools'],
      restrictions: ['No validator access', 'Limited earning potential'],
    },
    2: {
      benefits: ['Full marketplace access', 'Advanced AI tools', 'Higher earning potential'],
      restrictions: ['No validator access'],
    },
    3: {
      benefits: ['Validator eligibility', 'Premium features', 'Maximum earning potential'],
      restrictions: [],
    },
    4: {
      benefits: ['All features unlocked', 'Elite status', 'Maximum benefits'],
      restrictions: [],
    },
  };

  return configs[level as keyof typeof configs] || configs[0];
}

function getVerificationStatus(user: any): 'verified' | 'pending' | 'expired' {
  if (!user.sqlVerifiedAt) return 'pending';
  if (user.sqlExpiryDate && new Date() > user.sqlExpiryDate) return 'expired';
  return 'verified';
}

function checkUpgradeEligibility(user: any, aiScore: number) {
  const nextLevel = user.sqlLevel + 1;
  if (nextLevel > 4) return null;

  const requirements = {
    1: { minScore: 50, minCoins: 100 },
    2: { minScore: 150, minCoins: 500 },
    3: { minScore: 300, minCoins: 1500 },
    4: { minScore: 500, minCoins: 5000 },
  };

  const req = requirements[nextLevel as keyof typeof requirements];
  if (!req) return null;

  const totalLocked = user.coinLocks.reduce((sum: number, lock: any) => sum + lock.amount, 0);

  return {
    eligible: aiScore >= req.minScore && totalLocked >= req.minCoins,
    requirements: {
      aiScore: { current: aiScore, required: req.minScore },
      coinLock: { current: totalLocked, required: req.minCoins },
    },
    missingRequirements: [],
  };
}
