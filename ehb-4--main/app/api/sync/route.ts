import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

// Validation schemas
const syncRequestSchema = z.object({
  entityType: z.enum(['user', 'wallet', 'order', 'appointment', 'course']),
  lastSyncTimestamp: z.string().datetime(),
  filters: z.record(z.any()).optional(),
});

const syncResponseSchema = z.object({
  success: z.boolean(),
  data: z.array(z.any()),
  lastSyncTimestamp: z.string().datetime(),
  hasMore: z.boolean(),
});

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const validatedData = syncRequestSchema.parse(body);
    const { entityType, lastSyncTimestamp, filters } = validatedData;

    const lastSync = new Date(lastSyncTimestamp);
    const now = new Date();

    let data: any[] = [];
    let hasMore = false;

    switch (entityType) {
      case 'user':
        data = await prisma.user.findMany({
          where: {
            updatedAt: { gt: lastSync },
            ...filters,
          },
          take: 100,
        });
        hasMore = data.length === 100;
        break;

      case 'wallet':
        data = await prisma.wallet.findMany({
          where: {
            userId: session.user.id,
            updatedAt: { gt: lastSync },
            ...filters,
          },
          include: {
            transactions: {
              where: {
                createdAt: { gt: lastSync },
              },
              orderBy: { createdAt: 'desc' },
            },
          },
          take: 50,
        });
        hasMore = data.length === 50;
        break;

      case 'order':
        data = await prisma.order.findMany({
          where: {
            userId: session.user.id,
            updatedAt: { gt: lastSync },
            ...filters,
          },
          include: {
            items: true,
          },
          take: 50,
        });
        hasMore = data.length === 50;
        break;

      case 'appointment':
        data = await prisma.appointment.findMany({
          where: {
            userId: session.user.id,
            updatedAt: { gt: lastSync },
            ...filters,
          },
          include: {
            doctor: true,
          },
          take: 50,
        });
        hasMore = data.length === 50;
        break;

      case 'course':
        data = await prisma.course.findMany({
          where: {
            updatedAt: { gt: lastSync },
            ...filters,
          },
          include: {
            tutor: true,
            assignments: {
              where: {
                updatedAt: { gt: lastSync },
              },
            },
          },
          take: 50,
        });
        hasMore = data.length === 50;
        break;

      default:
        return NextResponse.json(
          { error: 'Invalid entity type' },
          { status: 400 }
        );
    }

    const response = syncResponseSchema.parse({
      success: true,
      data,
      lastSyncTimestamp: now.toISOString(),
      hasMore,
    });

    return NextResponse.json(response);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input data', details: error.errors },
        { status: 400 }
      );
    }
    console.error('Sync error:', error);
    return NextResponse.json(
      { error: 'Failed to sync data' },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const entityType = searchParams.get('entityType');
    const lastSyncTimestamp = searchParams.get('lastSyncTimestamp');

    if (!entityType || !lastSyncTimestamp) {
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      );
    }

    const validatedData = syncRequestSchema.parse({
      entityType,
      lastSyncTimestamp,
    });

    const lastSync = new Date(lastSyncTimestamp);
    const now = new Date();

    let data: any[] = [];
    let hasMore = false;

    switch (validatedData.entityType) {
      case 'user':
        data = await prisma.user.findMany({
          where: {
            updatedAt: { gt: lastSync },
          },
          take: 100,
        });
        hasMore = data.length === 100;
        break;

      case 'wallet':
        data = await prisma.wallet.findMany({
          where: {
            userId: session.user.id,
            updatedAt: { gt: lastSync },
          },
          include: {
            transactions: {
              where: {
                createdAt: { gt: lastSync },
              },
              orderBy: { createdAt: 'desc' },
            },
          },
          take: 50,
        });
        hasMore = data.length === 50;
        break;

      case 'order':
        data = await prisma.order.findMany({
          where: {
            userId: session.user.id,
            updatedAt: { gt: lastSync },
          },
          include: {
            items: true,
          },
          take: 50,
        });
        hasMore = data.length === 50;
        break;

      case 'appointment':
        data = await prisma.appointment.findMany({
          where: {
            userId: session.user.id,
            updatedAt: { gt: lastSync },
          },
          include: {
            doctor: true,
          },
          take: 50,
        });
        hasMore = data.length === 50;
        break;

      case 'course':
        data = await prisma.course.findMany({
          where: {
            updatedAt: { gt: lastSync },
          },
          include: {
            tutor: true,
            assignments: {
              where: {
                updatedAt: { gt: lastSync },
              },
            },
          },
          take: 50,
        });
        hasMore = data.length === 50;
        break;

      default:
        return NextResponse.json(
          { error: 'Invalid entity type' },
          { status: 400 }
        );
    }

    const response = syncResponseSchema.parse({
      success: true,
      data,
      lastSyncTimestamp: now.toISOString(),
      hasMore,
    });

    return NextResponse.json(response);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input data', details: error.errors },
        { status: 400 }
      );
    }
    console.error('Sync error:', error);
    return NextResponse.json(
      { error: 'Failed to sync data' },
      { status: 500 }
    );
  }
} 