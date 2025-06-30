import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { clientPromise } from '@/lib/mongodb';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const client = await clientPromise;
    const db = client.db();
    const sellers = await db.collection('sellers').find({}).toArray();
    const now = new Date();
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    // For each seller, count orders in last 30 days
    const sellerStats = await Promise.all(sellers.map(async (seller) => {
      const orderCount = await db.collection('orders').countDocuments({
        'items.sellerId': seller.userId,
        createdAt: { $gte: thirtyDaysAgo },
      });
      let status = 'inactive';
      if (orderCount >= 3) status = 'active';
      else if (orderCount >= 1) status = 'cold';
      return {
        sellerId: seller._id,
        name: seller.name,
        sqlLevel: seller.sqlLevel,
        lastLogin: seller.lastLogin || null,
        orderCount,
        status,
      };
    }));
    return NextResponse.json({ sellers: sellerStats });
  } catch (error) {
    console.error('Error fetching seller activity:', error);
    return NextResponse.json({ error: 'Failed to fetch seller activity' }, { status: 500 });
  }
} 