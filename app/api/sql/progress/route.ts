export const runtime = "nodejs";
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
        coinLocks: {
          where: { status: 'ACTIVE' }
        },
        skillTests: {
          orderBy: { createdAt: 'desc' }
        },
        sqlHistory: {
          orderBy: { createdAt: 'desc' },
          take: 10
        }
      }
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Calculate AI score
    const aiScore = calculateAIScore(user);
    
    // Get next level requirements
    const nextLevel = user.sqlLevel + 1;
    const requirements = getNextLevelRequirements(nextLevel);
    
    // Calculate progress for each requirement
    const progressData = calculateProgress(user, aiScore, requirements);
    
    // Calculate overall progress percentage
    const overallProgress = calculateOverallProgress(progressData);

    const response = {
      currentLevel: user.sqlLevel,
      progress: overallProgress,
      nextLevelRequirements: progressData,
      aiScore,
      totalLockedAmount: user.coinLocks.reduce((sum, lock) => sum + lock.amount, 0),
      passedSkillTests: user.skillTests.filter(test => test.passed).length,
      totalSkillTests: user.skillTests.length,
      recentActivity: user.sqlHistory.slice(0, 5).map(history => ({
        fromLevel: history.oldLevel,
        toLevel: history.newLevel,
        reason: history.reason,
        date: history.createdAt.toISOString()
      }))
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('SQL Progress Error:', error);
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
  const passedTests = user.skillTests.filter((test: any) => test.passed).length;
  score += passedTests * 20;
  
  // Coin lock score
  const totalLocked = user.coinLocks.reduce((sum: number, lock: any) => sum + lock.amount, 0);
  score += Math.min(totalLocked / 100, 15);
  
  // Complaint penalty
  score -= user.complaintCount * 10;
  
  // Fraud penalty
  if (user.fraudScore > 0.7) {
    score *= 0.5;
  }
  
  return Math.max(0, Math.min(500, Math.round(score)));
}

function getNextLevelRequirements(nextLevel: number) {
  const requirements = {
    1: [
      { id: 'ai_score', description: 'Achieve AI Score of 50+', required: 50 },
      { id: 'coin_lock', description: 'Lock 100 EHBGC coins', required: 100 },
      { id: 'skill_test', description: 'Pass basic skill test', required: 1 }
    ],
    2: [
      { id: 'ai_score', description: 'Achieve AI Score of 150+', required: 150 },
      { id: 'coin_lock', description: 'Lock 500 EHBGC coins', required: 500 },
      { id: 'skill_test', description: 'Pass MCQ skill test', required: 1 },
      { id: 'referrals', description: 'Get 2 active referrals', required: 2 }
    ],
    3: [
      { id: 'ai_score', description: 'Achieve AI Score of 300+', required: 300 },
      { id: 'coin_lock', description: 'Lock 1500 EHBGC coins', required: 1500 },
      { id: 'skill_test', description: 'Pass practical skill test', required: 1 },
      { id: 'referrals', description: 'Get 5 active referrals', required: 5 },
      { id: 'sales', description: 'Complete 10 successful sales', required: 10 }
    ],
    4: [
      { id: 'ai_score', description: 'Achieve AI Score of 500+', required: 500 },
      { id: 'coin_lock', description: 'Lock 5000 EHBGC coins', required: 5000 },
      { id: 'skill_test', description: 'Pass video interview', required: 1 },
      { id: 'referrals', description: 'Get 10 active referrals', required: 10 },
      { id: 'franchise', description: 'Own or manage a franchise', required: 1 }
    ]
  };
  
  return requirements[nextLevel as keyof typeof requirements] || [];
}

function calculateProgress(user: any, aiScore: number, requirements: any[]) {
  const totalLocked = user.coinLocks.reduce((sum: number, lock: any) => sum + lock.amount, 0);
  const passedTests = user.skillTests.filter((test: any) => test.passed).length;
  
  return requirements.map(req => {
    let current = 0;
    let completed = false;
    
    switch (req.id) {
      case 'ai_score':
        current = aiScore;
        completed = aiScore >= req.required;
        break;
      case 'coin_lock':
        current = totalLocked;
        completed = totalLocked >= req.required;
        break;
      case 'skill_test':
        current = passedTests;
        completed = passedTests >= req.required;
        break;
      case 'referrals':
        current = 0; // Placeholder for referral system
        completed = false;
        break;
      case 'sales':
        current = 0; // Placeholder for sales system
        completed = false;
        break;
      case 'franchise':
        current = 0; // Placeholder for franchise system
        completed = false;
        break;
      default:
        current = 0;
        completed = false;
    }
    
    return {
      description: req.description,
      completed,
      current,
      required: req.required,
      progress: Math.min(100, (current / req.required) * 100)
    };
  });
}

function calculateOverallProgress(progressData: any[]): number {
  if (progressData.length === 0) return 0;
  
  const totalProgress = progressData.reduce((sum, item) => sum + item.progress, 0);
  return Math.round(totalProgress / progressData.length);
}
