import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { clientPromise } from '@/lib/mongodb';

// GET: Affiliate summary for user
export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId') || session.user.id;
    const client = await clientPromise;
    const db = client.db();
    const affiliate = await db.collection('affiliates').findOne({ userId });
    if (!affiliate) {
      return NextResponse.json({ error: 'Affiliate profile not found' }, { status: 404 });
    }
    return NextResponse.json(affiliate);
  } catch (error) {
    console.error('Error fetching affiliate summary:', error);
    return NextResponse.json({ error: 'Failed to fetch affiliate summary' }, { status: 500 });
  }
}

// POST: Invite new referral (create referral link)
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const data = await req.json();
    const { invitedUserId } = data;
    if (!invitedUserId) {
      return NextResponse.json({ error: 'invitedUserId is required' }, { status: 400 });
    }
    const client = await clientPromise;
    const db = client.db();
    // Find or create affiliate profile for inviter
    let affiliate = await db.collection('affiliates').findOne({ userId: session.user.id });
    if (!affiliate) {
      affiliate = {
        userId: session.user.id,
        referralCode: 'EHBX-' + Math.random().toString(36).substr(2, 6).toUpperCase(),
        totalUsers: 0,
        totalEarnings: 0,
        sqlLevel: 'Free',
        rank: 'L1',
        levels: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      await db.collection('affiliates').insertOne(affiliate);
    }
    // Add referral link
    await db.collection('referrals').insertOne({
      inviterId: session.user.id,
      invitedUserId,
      referralCode: affiliate.referralCode,
      createdAt: new Date(),
    });
    return NextResponse.json({ message: 'Referral link created', referralCode: affiliate.referralCode });
  } catch (error) {
    console.error('Error creating referral:', error);
    return NextResponse.json({ error: 'Failed to create referral' }, { status: 500 });
  }
} 