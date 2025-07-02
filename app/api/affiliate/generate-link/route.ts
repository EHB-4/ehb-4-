import { NextResponse } from 'next/server';

/**
 * POST /api/affiliate/generate-link
 * Generate a new referral link for the user
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, campaign = 'default' } = body;

    if (!userId) {
      return NextResponse.json({ success: false, error: 'User ID is required' }, { status: 400 });
    }

    // Generate unique referral code
    const referralCode = `${userId}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Create referral link
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://ehb.com';
    const referralLink = `${baseUrl}/ref/${referralCode}`;

    // QR code URL (you can use a service like QR Server)
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(referralLink)}`;

    const linkData = {
      referralCode,
      referralLink,
      qrCodeUrl,
      campaign,
      createdAt: new Date().toISOString(),
      clicks: 0,
      conversions: 0,
      earnings: 0,
    };

    // In real implementation, save to database
    // await prisma.referralLink.create({ data: linkData });

    return NextResponse.json({
      success: true,
      data: linkData,
    });
  } catch (error) {
    console.error('Error generating referral link:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to generate referral link' },
      { status: 500 }
    );
  }
}
