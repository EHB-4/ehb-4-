export const runtime = 'nodejs';
import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const { userId, referrerCode } = await request.json();

    // Validate input
    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Check if already affiliate
    const existingAffiliate = await prisma.affiliateUser.findUnique({
      where: { userId },
    });

    if (existingAffiliate) {
      return NextResponse.json({ error: 'User already registered as affiliate' }, { status: 409 });
    }

    // Generate referral code
    const generateReferralCode = (username: string) => {
      const timestamp = Date.now().toString(36);
      const random = Math.random().toString(36).substring(2, 8);
      return `${username}_${timestamp}_${random}`.toUpperCase();
    };

    // Find referrer if code provided
    let referrerId = null;
    if (referrerCode) {
      const referrer = await prisma.affiliateUser.findUnique({
        where: { referralCode: referrerCode },
      });
      if (referrer) {
        referrerId = referrer.id;
      }
    }

    // Create affiliate profile
    const affiliate = await prisma.affiliateUser.create({
      data: {
        userId,
        referralCode: generateReferralCode(user.name),
        referrerId,
        sqlLevel: 'FREE',
        affiliateRank: 'BRONZE',
        isActive: true,
        totalEarnings: 0,
        totalWithdrawn: 0,
        currentBalance: 0,
        lockedBalance: 0,
        autoWithdraw: false,
        withdrawalMethod: 'EHB_WALLET',
      },
      include: {
        user: true,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Affiliate registered successfully',
      data: {
        id: affiliate.id,
        referralCode: affiliate.referralCode,
        sqlLevel: affiliate.sqlLevel,
        affiliateRank: affiliate.affiliateRank,
        user: {
          name: affiliate.user.name,
          email: affiliate.user.email,
        },
      },
    });
  } catch (error) {
    console.error('Error registering affiliate:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
