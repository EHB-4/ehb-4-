import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

// Validation schemas
const shopSchema = z.object({
  name: z.string().min(1, 'Shop name is required'),
  description: z.string().optional(),
  city: z.string().min(1, 'City is required'),
  address: z.string().min(1, 'Address is required'),
  phone: z.string().optional(),
  email: z.string().email('Valid email is required').optional(),
});

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const city = searchParams.get('city') || '';

    // Build filter conditions
    const where: any = {
      isActive: true,
    };

    if (city) {
      where.city = { contains: city, mode: 'insensitive' };
    }

    // Get shops with pagination
    const [shops, total] = await Promise.all([
      prisma.shop.findMany({
        where,
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
          _count: {
            select: {
              products: true,
            },
          },
        },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.shop.count({ where }),
    ]);

    return NextResponse.json({
      shops,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Shops fetch error:', error);
    return NextResponse.json({ error: 'Failed to fetch shops' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const validatedData = shopSchema.parse(body);

    // Check if user already has a shop
    const existingShop = await prisma.shop.findFirst({
      where: { userId: session.user.id },
    });

    if (existingShop) {
      return NextResponse.json({ error: 'You already have a shop' }, { status: 400 });
    }

    // Create shop
    const shop = await prisma.shop.create({
      data: {
        ...validatedData,
        userId: session.user.id,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    return NextResponse.json(shop, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.errors },
        { status: 400 }
      );
    }

    console.error('Shop creation error:', error);
    return NextResponse.json({ error: 'Failed to create shop' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { id, ...updates } = body;
    const validatedData = shopSchema.partial().parse(updates);

    // Check if shop exists and belongs to user
    const existingShop = await prisma.shop.findFirst({
      where: {
        id,
        userId: session.user.id,
      },
    });

    if (!existingShop) {
      return NextResponse.json({ error: 'Shop not found or unauthorized' }, { status: 404 });
    }

    // Update shop
    const shop = await prisma.shop.update({
      where: { id },
      data: validatedData,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    return NextResponse.json(shop);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.errors },
        { status: 400 }
      );
    }

    console.error('Shop update error:', error);
    return NextResponse.json({ error: 'Failed to update shop' }, { status: 500 });
  }
}
