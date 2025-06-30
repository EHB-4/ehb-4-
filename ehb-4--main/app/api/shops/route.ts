import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { checkModuleEligibility } from '@/lib/utils/walletEligibility';

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const city = searchParams.get('city');
    const search = searchParams.get('search');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;

    // Build Prisma query
    const where: any = { status: 'active' };
    if (category) where.category = category;
    if (city) where.city = { contains: city, mode: 'insensitive' };
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }

    const [shops, total] = await Promise.all([
      prisma.shop.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.shop.count({ where }),
    ]);

    return NextResponse.json({
      shops,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching shops:', error);
    return NextResponse.json({ error: 'Failed to fetch shops' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check wallet eligibility
    const eligibility = await checkModuleEligibility(session.user.id, 'gosellr');
    if (!eligibility.isEligible) {
      return NextResponse.json({ error: eligibility.message }, { status: 403 });
    }

    const body = await request.json();
    const { name, description, city, address, phone, email, logo, coverImage, category } = body;

    if (!name || !description || !city || !address || !phone || !email || !category) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Check if user already has a shop
    const existingShop = await prisma.shop.findFirst({
      where: { ownerId: session.user.id },
    });
    if (existingShop) {
      return NextResponse.json({ error: 'You already have a shop' }, { status: 400 });
    }

    // Create shop
    const shop = await prisma.shop.create({
      data: {
        name,
        description,
        ownerId: session.user.id,
        city,
        address,
        phone,
        email,
        logo,
        coverImage,
        category,
        status: 'active',
        rating: 0,
        totalReviews: 0,
        totalProducts: 0,
      },
    });

    return NextResponse.json({
      message: 'Shop created successfully',
      shop,
    });
  } catch (error) {
    console.error('Error creating shop:', error);
    return NextResponse.json({ error: 'Failed to create shop' }, { status: 500 });
  }
}
