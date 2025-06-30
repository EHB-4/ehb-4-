import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { clientPromise } from '@/lib/mongodb';

// POST: File a new complaint
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const data = await req.json();
    const { orderId, type, description, images, location } = data;
    if (!orderId || !type || !description) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    const client = await clientPromise;
    const db = client.db();
    const complaint = {
      orderId,
      userId: session.user.id,
      type,
      description,
      images: images || [],
      location: location || '',
      status: 'submitted',
      escalationLevel: 1, // 1: Sub, 2: Master, 3: Corporate
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const result = await db.collection('complaints').insertOne(complaint);
    return NextResponse.json({ success: true, complaintId: result.insertedId, status: 'submitted' });
  } catch (error) {
    console.error('Error filing complaint:', error);
    return NextResponse.json({ error: 'Failed to file complaint' }, { status: 500 });
  }
}

// GET: List complaints (user sees own, admin sees all)
export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const client = await clientPromise;
    const db = client.db();
    let complaints;
    if (session.user.role === 'admin') {
      complaints = await db.collection('complaints').find({}).toArray();
    } else {
      complaints = await db.collection('complaints').find({ userId: session.user.id }).toArray();
    }
    return NextResponse.json({ complaints });
  } catch (error) {
    console.error('Error fetching complaints:', error);
    return NextResponse.json({ error: 'Failed to fetch complaints' }, { status: 500 });
  }
} 