import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { clientPromise } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

// Get single franchise stats (public)
export async function GET(req: Request, { params }: { params: { franchiseId: string } }) {
  try {
    const client = await clientPromise;
    const db = client.db();
    const franchise = await db.collection('franchises').findOne({ _id: new ObjectId(params.franchiseId) });
    if (!franchise) {
      return NextResponse.json({ error: 'Franchise not found' }, { status: 404 });
    }
    return NextResponse.json({ franchise });
  } catch (error) {
    console.error('Error fetching franchise:', error);
    return NextResponse.json({ error: 'Failed to fetch franchise' }, { status: 500 });
  }
}

// Admin: Update earnings, area, level, escalate complaint
export async function PATCH(req: Request, { params }: { params: { franchiseId: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const data = await req.json();
    const { earnings, area, level, escalateComplaint } = data;
    const client = await clientPromise;
    const db = client.db();
    const updateData: any = { updatedAt: new Date() };
    if (earnings !== undefined) updateData.earnings = earnings;
    if (area) updateData.area = area;
    if (level) updateData.level = level;
    if (escalateComplaint) updateData.escalateComplaint = escalateComplaint;
    await db.collection('franchises').updateOne({ _id: new ObjectId(params.franchiseId) }, { $set: updateData });
    const updated = await db.collection('franchises').findOne({ _id: new ObjectId(params.franchiseId) });
    return NextResponse.json({ message: 'Franchise updated', franchise: updated });
  } catch (error) {
    console.error('Error updating franchise:', error);
    return NextResponse.json({ error: 'Failed to update franchise' }, { status: 500 });
  }
} 