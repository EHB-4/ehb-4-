import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { clientPromise } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !['admin', 'franchise'].includes(session.user.role)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const { searchParams } = new URL(req.url);
    const franchiseId = searchParams.get('franchiseId');
    if (!franchiseId) {
      return NextResponse.json({ error: 'Missing franchiseId' }, { status: 400 });
    }
    const client = await clientPromise;
    const db = client.db();
    // Area-wise sales
    const salesByArea = await db.collection('orders').aggregate([
      { $match: { franchiseId } },
      { $group: { _id: '$area', totalSales: { $sum: '$total' }, orderCount: { $sum: 1 } } },
      { $sort: { totalSales: -1 } },
    ]).toArray();
    // Top products
    const topProducts = await db.collection('orders').aggregate([
      { $match: { franchiseId } },
      { $unwind: '$items' },
      { $group: { _id: '$items.productId', count: { $sum: '$items.quantity' } } },
      { $sort: { count: -1 } },
      { $limit: 5 },
      {
        $lookup: {
          from: 'products',
          localField: '_id',
          foreignField: '_id',
          as: 'product',
        },
      },
      { $unwind: '$product' },
      { $project: { _id: 1, count: 1, name: '$product.name' } },
    ]).toArray();
    // Ticket (complaint) response time
    const complaints = await db.collection('complaints').find({ franchiseId }).toArray();
    const avgResponseTime = complaints.length > 0
      ? Math.round(
          complaints.reduce((sum, c) => {
            if (c.resolvedAt && c.createdAt) {
              return sum + (new Date(c.resolvedAt) - new Date(c.createdAt));
            }
            return sum;
          }, 0) / complaints.length / (1000 * 60 * 60) // in hours
        )
      : null;
    // Active sellers
    const sellers = await db.collection('sellers').find({ franchiseId, kycStatus: 'approved' }).toArray();
    return NextResponse.json({
      salesByArea,
      topProducts,
      avgResponseTime,
      activeSellers: sellers.map(s => ({ id: s._id, name: s.name, sqlLevel: s.sqlLevel })),
    });
  } catch (error) {
    console.error('Error fetching franchise analytics:', error);
    return NextResponse.json({ error: 'Failed to fetch franchise analytics' }, { status: 500 });
  }
} 