import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { clientPromise } from '@/lib/mongodb';

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const { searchParams } = new URL(req.url);
    const type = searchParams.get('type');
    const from = searchParams.get('from');
    const to = searchParams.get('to');
    const client = await clientPromise;
    const db = client.db();
    const query: any = { userId: session.user.id };
    if (type && type !== 'all') query.type = type;
    if (from || to) {
      query.createdAt = {};
      if (from) query.createdAt.$gte = new Date(from);
      if (to) query.createdAt.$lte = new Date(to);
    }
    const transactions = await db
      .collection('wallet_transactions')
      .find(query)
      .sort({ createdAt: -1 })
      .toArray();
    return NextResponse.json(transactions);
  } catch (error) {
    console.error('Error fetching wallet history:', error);
    return NextResponse.json({ error: 'Failed to fetch wallet history' }, { status: 500 });
  }
} 