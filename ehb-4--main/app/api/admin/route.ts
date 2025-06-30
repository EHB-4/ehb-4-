import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { clientPromise } from '@/lib/mongodb';

// GET: Admin dashboard stats
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const client = await clientPromise;
    const db = client.db();
    const ordersCount = await db.collection('orders').countDocuments();
    const usersCount = await db.collection('users').countDocuments();
    const revenue = await db.collection('orders').aggregate([
      { $group: { _id: null, total: { $sum: '$total' } } },
    ]).toArray();
    const pendingSellers = await db.collection('sellers').countDocuments({ kycStatus: 'pending' });
    const pendingProducts = await db.collection('products').countDocuments({ status: 'pending' });
    const pendingOrders = await db.collection('orders').countDocuments({ status: 'pending' });
    const pendingComplaints = await db.collection('complaints').countDocuments({ status: 'submitted' });
    return NextResponse.json({
      ordersCount,
      usersCount,
      revenue: revenue[0]?.total || 0,
      pending: {
        sellers: pendingSellers,
        products: pendingProducts,
        orders: pendingOrders,
        complaints: pendingComplaints,
      },
    });
  } catch (error) {
    console.error('Error fetching admin stats:', error);
    return NextResponse.json({ error: 'Failed to fetch admin stats' }, { status: 500 });
  }
}

// PATCH: Approve/reject sellers, products, orders, complaints
export async function PATCH(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const data = await req.json();
    const { type, id, action, reason } = data;
    if (!type || !id || !['approve', 'reject'].includes(action)) {
      return NextResponse.json({ error: 'Missing or invalid fields' }, { status: 400 });
    }
    const client = await clientPromise;
    const db = client.db();
    let update = {};
    if (action === 'approve') {
      if (type === 'seller') update = { kycStatus: 'approved', updatedAt: new Date() };
      if (type === 'product') update = { status: 'active', updatedAt: new Date() };
      if (type === 'order') update = { status: 'approved', updatedAt: new Date() };
      if (type === 'complaint') update = { status: 'resolved', updatedAt: new Date() };
    } else if (action === 'reject') {
      if (type === 'seller') update = { kycStatus: 'rejected', kycRejectionReason: reason || '', updatedAt: new Date() };
      if (type === 'product') update = { status: 'rejected', rejectionReason: reason || '', updatedAt: new Date() };
      if (type === 'order') update = { status: 'rejected', rejectionReason: reason || '', updatedAt: new Date() };
      if (type === 'complaint') update = { status: 'rejected', rejectionReason: reason || '', updatedAt: new Date() };
    }
    let collection = '';
    if (type === 'seller') collection = 'sellers';
    if (type === 'product') collection = 'products';
    if (type === 'order') collection = 'orders';
    if (type === 'complaint') collection = 'complaints';
    if (!collection) {
      return NextResponse.json({ error: 'Invalid type' }, { status: 400 });
    }
    await db.collection(collection).updateOne(
      { _id: id },
      { $set: update }
    );
    return NextResponse.json({ message: `${type} ${action}d` });
  } catch (error) {
    console.error('Error updating admin resource:', error);
    return NextResponse.json({ error: 'Failed to update resource' }, { status: 500 });
  }
} 