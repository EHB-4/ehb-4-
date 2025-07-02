import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const category = searchParams.get('category');
    const userId = searchParams.get('userId');

    const whereClause: any = {};

    if (status) {
      whereClause.status = status;
    }

    if (category) {
      whereClause.franchise = {
        category: category,
      };
    }

    if (userId) {
      whereClause.userId = userId;
    }

    const applications = await prisma.franchiseApplication.findMany({
      where: whereClause,
      include: {
        franchise: {
          select: {
            id: true,
            name: true,
            category: true,
            level: true,
            investment: true,
          },
        },
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json({
      success: true,
      data: applications,
      count: applications.length,
    });
  } catch (error) {
    console.error('Franchise Applications API Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch applications' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      franchiseId,
      userId,
      personalInfo,
      businessPlan,
      financialInfo,
      experience,
      investmentAmount,
      preferredLocation,
    } = body;

    // Validate required fields
    if (!franchiseId || !userId || !personalInfo || !financialInfo) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check if user already has an application for this franchise
    const existingApplication = await prisma.franchiseApplication.findFirst({
      where: {
        franchiseId,
        userId,
      },
    });

    if (existingApplication) {
      return NextResponse.json(
        { success: false, error: 'Application already exists for this franchise' },
        { status: 400 }
      );
    }

    const application = await prisma.franchiseApplication.create({
      data: {
        franchiseId,
        userId,
        personalInfo,
        businessPlan: businessPlan || '',
        financialInfo,
        experience: experience || '',
        investmentAmount: parseFloat(investmentAmount),
        preferredLocation,
        status: 'PENDING',
        submittedAt: new Date(),
      },
      include: {
        franchise: {
          select: {
            name: true,
            category: true,
            level: true,
          },
        },
      },
    });

    return NextResponse.json({
      success: true,
      data: application,
      message: 'Application submitted successfully',
    });
  } catch (error) {
    console.error('Franchise Application Creation Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to submit application' },
      { status: 500 }
    );
  }
}
