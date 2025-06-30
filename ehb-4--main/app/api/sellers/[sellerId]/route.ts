import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { clientPromise } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

// Get public seller profile by ID
export async function GET(req: Request, { params }: { params: { sellerId: string } }) {
  try {
    const client = await clientPromise;
    const db = client.db();
    const seller = await db.collection('sellers').findOne({ _id: new ObjectId(params.sellerId) });
    if (!seller) {
      return NextResponse.json({ error: 'Seller not found' }, { status: 404 });
    }
    return NextResponse.json({ seller });
  } catch (error) {
    console.error('Error fetching seller:', error);
    return NextResponse.json({ error: 'Failed to fetch seller' }, { status: 500 });
  }
}

// Admin: Approve KYC or update SQL level
export async function PATCH(req: Request, { params }: { params: { sellerId: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const data = await req.json();
    const { kycStatus, sqlLevel } = data;
    const client = await clientPromise;
    const db = client.db();
    const updateData: any = { updatedAt: new Date() };
    if (kycStatus) updateData.kycStatus = kycStatus;
    if (sqlLevel) updateData.sqlLevel = sqlLevel;
    await db.collection('sellers').updateOne({ _id: new ObjectId(params.sellerId) }, { $set: updateData });
    const updated = await db.collection('sellers').findOne({ _id: new ObjectId(params.sellerId) });
    return NextResponse.json({ message: 'Seller updated', seller: updated });
  } catch (error) {
    console.error('Error updating seller:', error);
    return NextResponse.json({ error: 'Failed to update seller' }, { status: 500 });
  }
} 