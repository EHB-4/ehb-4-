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
    const { testType, answers, projectData } = body;

    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Calculate test score based on type
    const score = calculateTestScore(testType, answers, projectData);
    const passed = score >= getPassingScore(testType);

    // Create skill test record
    const skillTest = await prisma.skillTest.create({
      data: {
        userId: user.id,
        testType,
        score,
        passed,
        testData: {
          answers,
          projectData,
          timestamp: new Date().toISOString()
        }
      }
    });

    // Update user's AI score if passed
    if (passed) {
      await prisma.user.update({
        where: { id: user.id },
        data: {
          aiScore: {
            increment: 20
          }
        }
      });
    }

    return NextResponse.json({
      success: true,
      score,
      passed,
      testId: skillTest.id,
      feedback: getTestFeedback(testType, score, passed)
    });

  } catch (error) {
    console.error('Skill Test Error:', error);
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
        skillTests: {
          orderBy: { createdAt: 'desc' },
          take: 10
        }
      }
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({
      testHistory: user.skillTests.map(test => ({
        id: test.id,
        type: test.testType,
        score: test.score,
        passed: test.passed,
        date: test.createdAt.toISOString()
      })),
      totalTests: user.skillTests.length,
      passedTests: user.skillTests.filter(test => test.passed).length,
      averageScore: user.skillTests.length > 0 
        ? Math.round(user.skillTests.reduce((sum, test) => sum + test.score, 0) / user.skillTests.length)
        : 0
    });

  } catch (error) {
    console.error('Skill Test History Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

function calculateTestScore(testType: string, answers: any, projectData: any): number {
  switch (testType) {
    case 'MCQ':
      return calculateMCQScore(answers);
    case 'PRACTICAL':
      return calculatePracticalScore(projectData);
    case 'VIDEO_INTERVIEW':
      return calculateVideoScore(projectData);
    default:
      return 0;
  }
}

function calculateMCQScore(answers: any): number {
  // Mock MCQ scoring - in real implementation, compare with correct answers
  const totalQuestions = Object.keys(answers).length;
  const correctAnswers = Math.floor(Math.random() * totalQuestions) + Math.floor(totalQuestions * 0.6);
  return Math.round((correctAnswers / totalQuestions) * 100);
}

function calculatePracticalScore(projectData: any): number {
  // Mock practical scoring based on project completion
  let score = 0;
  
  if (projectData.completed) score += 40;
  if (projectData.quality === 'high') score += 30;
  if (projectData.onTime) score += 20;
  if (projectData.documentation) score += 10;
  
  return Math.min(100, score);
}

function calculateVideoScore(projectData: any): number {
  // Mock video interview scoring
  let score = 0;
  
  if (projectData.communication) score += 30;
  if (projectData.knowledge) score += 40;
  if (projectData.confidence) score += 20;
  if (projectData.professionalism) score += 10;
  
  return Math.min(100, score);
}

function getPassingScore(testType: string): number {
  const passingScores = {
    'MCQ': 70,
    'PRACTICAL': 75,
    'VIDEO_INTERVIEW': 80
  };
  
  return passingScores[testType as keyof typeof passingScores] || 70;
}

function getTestFeedback(testType: string, score: number, passed: boolean): string {
  if (passed) {
    return `Congratulations! You passed the ${testType.toLowerCase()} test with a score of ${score}%.`;
  } else {
    return `You scored ${score}% on the ${testType.toLowerCase()} test. The passing score is ${getPassingScore(testType)}%. Please try again.`;
  }
} 