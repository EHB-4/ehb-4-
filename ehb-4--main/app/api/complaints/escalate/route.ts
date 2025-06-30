import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { clientPromise } from '@/lib/mongodb';
import { complaintsTriage } from '@/lib/ai/complaintsTriage';
import { ObjectId } from 'mongodb';

// POST: Escalate a complaint using AI triage
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user.role !== 'admin' && session.user.role !== 'franchise')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const data = await req.json();
    const { complaintId, action } = data;
    if (!complaintId) {
      return NextResponse.json({ error: 'Missing complaintId' }, { status: 400 });
    }
    const client = await clientPromise;
    const db = client.db();
    const complaint = await db.collection('complaints').findOne({ _id: new ObjectId(complaintId) });
    if (!complaint) {
      return NextResponse.json({ error: 'Complaint not found' }, { status: 404 });
    }
    // Run AI triage
    const triageResult = complaintsTriage({
      complaintText: complaint.description,
      userSQL: complaint.userSQL,
      serviceType: complaint.type,
      submittedAt: complaint.createdAt,
    });
    // Update escalation level and status
    let newEscalationLevel = complaint.escalationLevel;
    let newStatus = complaint.status;
    if (triageResult.recommendedEscalation === 'Master Franchise') {
      newEscalationLevel = 2;
      newStatus = 'escalated_to_master';
    } else if (triageResult.recommendedEscalation === 'Corporate') {
      newEscalationLevel = 3;
      newStatus = 'escalated_to_corporate';
    }
    // Allow manual override
    if (action === 'escalate_to_corporate') {
      newEscalationLevel = 3;
      newStatus = 'escalated_to_corporate';
    } else if (action === 'escalate_to_master') {
      newEscalationLevel = 2;
      newStatus = 'escalated_to_master';
    }
    await db.collection('complaints').updateOne(
      { _id: new ObjectId(complaintId) },
      {
        $set: {
          escalationLevel: newEscalationLevel,
          status: newStatus,
          updatedAt: new Date(),
          aiEscalation: triageResult,
        },
        $push: {
          escalationLog: {
            at: new Date(),
            by: session.user.id,
            action: action || triageResult.recommendedEscalation,
            aiResult: triageResult,
          },
        },
      }
    );
    return NextResponse.json({ success: true, triageResult, newStatus });
  } catch (error) {
    console.error('Error escalating complaint:', error);
    return NextResponse.json({ error: 'Failed to escalate complaint' }, { status: 500 });
  }
} 