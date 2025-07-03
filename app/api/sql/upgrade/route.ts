export const runtime = "nodejs";
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession();
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { targetLevel, documents, notes } = body;

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: {
        coinLocks: {
          where: { status: 'ACTIVE' }
        },
        skillTests: {
          where: { passed: true }
        }
      }
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Validate target level
    if (targetLevel <= user.sqlLevel || targetLevel > 4) {
      return NextResponse.json({ 
        error: 'Invalid target level' 
      }, { status: 400 });
    }

    // Check if upgrade request already exists
    const existingRequest = await prisma.sQLUpgradeRequest.findFirst({
      where: {
        userId: user.id,
        status: 'PENDING'
      }
    });

    if (existingRequest) {
      return NextResponse.json({ 
        error: 'Upgrade request already pending' 
      }, { status: 400 });
    }

    // Check eligibility
    const eligibility = checkUpgradeEligibility(user, targetLevel);
    if (!eligibility.eligible) {
      return NextResponse.json({
        error: 'Not eligible for upgrade',
        details: eligibility.missingRequirements
      }, { status: 400 });
    }

    // Create upgrade request
    const upgradeRequest = await prisma.sQLUpgradeRequest.create({
      data: {
        userId: user.id,
        fromLevel: user.sqlLevel,
        toLevel: targetLevel,
        documents: documents || {},
        notes: notes || '',
        status: 'PENDING'
      }
    });

    // Log in SQL history
    await prisma.sQLHistory.create({
      data: {
        userId: user.id,
        oldLevel: user.sqlLevel,
        newLevel: targetLevel,
        reason: 'Upgrade request submitted',
        aiScore: calculateAIScore(user)
      }
    });

    return NextResponse.json({
      success: true,
      message: 'Upgrade request submitted successfully',
      requestId: upgradeRequest.id,
      estimatedReviewTime: '24-48 hours'
    });

  } catch (error) {
    console.error('SQL Upgrade Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession();
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: {
        upgradeRequests: {
          orderBy: { createdAt: 'desc' },
          take: 10
        }
      }
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Get upgrade steps for current level
    const upgradeSteps = getUpgradeSteps(user.sqlLevel);

    return NextResponse.json({
      currentLevel: user.sqlLevel,
      upgradeSteps,
      recentRequests: user.upgradeRequests.map(req => ({
        id: req.id,
        fromLevel: req.fromLevel,
        toLevel: req.toLevel,
        status: req.status,
        submittedAt: req.createdAt.toISOString(),
        reviewedAt: req.reviewedAt?.toISOString(),
        notes: req.notes
      }))
    });

  } catch (error) {
    console.error('SQL Upgrade Steps Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

function calculateAIScore(user: any): number {
  let score = 0;
  
  // Base score
  score += 25;
  
  // Skill test score
  const passedTests = user.skillTests.length;
  score += passedTests * 20;
  
  // Coin lock score
  const totalLocked = user.coinLocks.reduce((sum: number, lock: any) => sum + lock.amount, 0);
  score += Math.min(totalLocked / 100, 15);
  
  return Math.max(0, Math.min(500, Math.round(score)));
}

function checkUpgradeEligibility(user: any, targetLevel: number) {
  const requirements = {
    1: { minScore: 50, minCoins: 100 },
    2: { minScore: 150, minCoins: 500 },
    3: { minScore: 300, minCoins: 1500 },
    4: { minScore: 500, minCoins: 5000 }
  };
  
  const req = requirements[targetLevel as keyof typeof requirements];
  if (!req) {
    return { eligible: false, missingRequirements: ['Invalid target level'] };
  }
  
  const aiScore = calculateAIScore(user);
  const totalLocked = user.coinLocks.reduce((sum: number, lock: any) => sum + lock.amount, 0);
  
  const missingRequirements = [];
  
  if (aiScore < req.minScore) {
    missingRequirements.push(`AI Score: ${aiScore}/${req.minScore}`);
  }
  
  if (totalLocked < req.minCoins) {
    missingRequirements.push(`Coin Lock: ${totalLocked}/${req.minCoins} EHBGC`);
  }
  
  return {
    eligible: missingRequirements.length === 0,
    missingRequirements
  };
}

function getUpgradeSteps(currentLevel: number) {
  const steps = {
    0: [
      {
        id: 'pss',
        title: 'PSS Verification',
        description: 'Complete KYC and document verification',
        status: 'pending',
        link: '/pss'
      },
      {
        id: 'skill_test',
        title: 'Basic Skill Test',
        description: 'Take the basic skill assessment',
        status: 'pending',
        link: '/edr'
      },
      {
        id: 'coin_lock',
        title: 'Coin Lock',
        description: 'Lock 100 EHBGC coins for 1 year',
        status: 'pending',
        link: '/wallet'
      }
    ],
    1: [
      {
        id: 'advanced_skill',
        title: 'Advanced Skill Test',
        description: 'Pass MCQ-based skill assessment',
        status: 'pending',
        link: '/edr'
      },
      {
        id: 'referrals',
        title: 'Get Referrals',
        description: 'Invite 2 active users to the platform',
        status: 'pending',
        link: '/affiliate'
      },
      {
        id: 'coin_lock',
        title: 'Coin Lock',
        description: 'Lock 500 EHBGC coins for 2 years',
        status: 'pending',
        link: '/wallet'
      }
    ],
    2: [
      {
        id: 'practical_test',
        title: 'Practical Skill Test',
        description: 'Complete hands-on project assessment',
        status: 'pending',
        link: '/edr'
      },
      {
        id: 'sales',
        title: 'Complete Sales',
        description: 'Make 10 successful sales',
        status: 'pending',
        link: '/gosellr'
      },
      {
        id: 'coin_lock',
        title: 'Coin Lock',
        description: 'Lock 1500 EHBGC coins for 3 years',
        status: 'pending',
        link: '/wallet'
      }
    ],
    3: [
      {
        id: 'video_interview',
        title: 'Video Interview',
        description: 'Complete live video interview',
        status: 'pending',
        link: '/edr'
      },
      {
        id: 'franchise',
        title: 'Franchise Management',
        description: 'Own or manage a franchise',
        status: 'pending',
        link: '/franchise'
      },
      {
        id: 'coin_lock',
        title: 'Coin Lock',
        description: 'Lock 5000 EHBGC coins for 3 years',
        status: 'pending',
        link: '/wallet'
      }
    ]
  };
  
  return steps[currentLevel as keyof typeof steps] || [];
}
