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
    const franchises = await db.collection('franchises').find({}).toArray();
    return NextResponse.json({ franchises });
  } catch (error) {
    console.error('Error fetching franchises:', error);
    return NextResponse.json({ error: 'Failed to fetch franchises' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const data = await req.json();
    const { name, area, level } = data;
    if (!name || !area || !level) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    const client = await clientPromise;
    const db = client.db();
    const franchise = {
      name,
      area,
      level,
      earnings: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const result = await db.collection('franchises').insertOne(franchise);
    return NextResponse.json({ message: 'Franchise created', franchise: { ...franchise, _id: result.insertedId } });
  } catch (error) {
    console.error('Error creating franchise:', error);
    return NextResponse.json({ error: 'Failed to create franchise' }, { status: 500 });
  }
} 