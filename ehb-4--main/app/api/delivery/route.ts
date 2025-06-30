import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { clientPromise } from '@/lib/mongodb';

// POST: Assign rider to order (admin/franchise only)
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !['admin', 'franchise'].includes(session.user.role)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const data = await req.json();
    const { orderId, riderId } = data;
    if (!orderId || !riderId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    const client = await clientPromise;
    const db = client.db();
    await db.collection('orders').updateOne(
      { _id: orderId },
      { $set: { riderId, deliveryStatus: 'assigned', updatedAt: new Date() } }
    );
    return NextResponse.json({ message: 'Rider assigned' });
  } catch (error) {
    console.error('Error assigning rider:', error);
    return NextResponse.json({ error: 'Failed to assign rider' }, { status: 500 });
  }
}

// PATCH: Update delivery status/feedback (rider only)
export async function PATCH(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'rider') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const data = await req.json();
    const { orderId, status, feedback } = data;
    if (!orderId || !status) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    const client = await clientPromise;
    const db = client.db();
    // Only assigned rider can update
    const order = await db.collection('orders').findOne({ _id: orderId });
    if (!order || order.riderId !== session.user.id) {
      return NextResponse.json({ error: 'Not authorized for this order' }, { status: 403 });
    }
    const updateData: any = { deliveryStatus: status, updatedAt: new Date() };
    if (feedback) updateData.deliveryFeedback = feedback;
    await db.collection('orders').updateOne(
      { _id: orderId },
      { $set: updateData }
    );
    return NextResponse.json({ message: 'Delivery status updated' });
  } catch (error) {
    console.error('Error updating delivery status:', error);
    return NextResponse.json({ error: 'Failed to update delivery status' }, { status: 500 });
  }
} 