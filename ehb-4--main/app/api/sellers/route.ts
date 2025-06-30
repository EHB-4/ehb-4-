import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { clientPromise } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

// Register as seller
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const data = await req.json();
    const { name, kycDocs } = data;
    if (!name) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }
    const client = await clientPromise;
    const db = client.db();
    // Check if already registered
    const existing = await db.collection('sellers').findOne({ userId: session.user.id });
    if (existing) {
      return NextResponse.json({ error: 'Already registered as seller' }, { status: 400 });
    }
    const seller = {
      userId: session.user.id,
      name,
      kycDocs: kycDocs || [],
      kycStatus: 'pending',
      sqlLevel: 'Free',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const result = await db.collection('sellers').insertOne(seller);
    return NextResponse.json({ message: 'Seller registered', seller: { ...seller, _id: result.insertedId } });
  } catch (error) {
    console.error('Error registering seller:', error);
    return NextResponse.json({ error: 'Failed to register seller' }, { status: 500 });
  }
}

// Get seller profile (current user or all for admin)
export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const { searchParams } = new URL(req.url);
    const all = searchParams.get('all') === 'true';
    const client = await clientPromise;
    const db = client.db();
    if (all && session.user.role === 'admin') {
      const sellers = await db.collection('sellers').find({}).toArray();
      return NextResponse.json({ sellers });
    }
    // Only current user's seller profile
    const seller = await db.collection('sellers').findOne({ userId: session.user.id });
    if (!seller) {
      return NextResponse.json({ error: 'Seller profile not found' }, { status: 404 });
    }
    return NextResponse.json({ seller });
  } catch (error) {
    console.error('Error fetching seller:', error);
    return NextResponse.json({ error: 'Failed to fetch seller' }, { status: 500 });
  }
}

// Update seller profile/KYC
export async function PATCH(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const data = await req.json();
    const { name, kycDocs } = data;
    const client = await clientPromise;
    const db = client.db();
    const seller = await db.collection('sellers').findOne({ userId: session.user.id });
    if (!seller) {
      return NextResponse.json({ error: 'Seller profile not found' }, { status: 404 });
    }
    const updateData: any = { updatedAt: new Date() };
    if (name) updateData.name = name;
    if (kycDocs) updateData.kycDocs = kycDocs;
    await db.collection('sellers').updateOne({ userId: session.user.id }, { $set: updateData });
    const updated = await db.collection('sellers').findOne({ userId: session.user.id });
    return NextResponse.json({ message: 'Seller updated', seller: updated });
  } catch (error) {
    console.error('Error updating seller:', error);
    return NextResponse.json({ error: 'Failed to update seller' }, { status: 500 });
  }
} 