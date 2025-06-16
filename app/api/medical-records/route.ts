import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const medicalRecordSchema = z.object({
  patientId: z.string(),
  diagnosis: z.string().min(1),
  prescription: z.string().optional(),
  notes: z.string().optional(),
  attachments: z.array(z.string()).optional(),
  doctorId: z.string(),
  visitDate: z.string().datetime(),
});

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const patientId = searchParams.get('patientId');
    const doctorId = searchParams.get('doctorId');

    if (!patientId && !doctorId) {
      return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 });
    }

    const records = await prisma.medicalRecord.findMany({
      where: {
        OR: [
          { patientId: patientId || undefined },
          { doctorId: doctorId || undefined },
        ],
      },
      include: {
        patient: true,
        doctor: true,
      },
      orderBy: {
        visitDate: 'desc',
      },
    });

    return NextResponse.json(records);
  } catch (error) {
    console.error('Medical records fetch error:', error);
    return NextResponse.json({ error: 'Failed to fetch medical records' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const validationResult = medicalRecordSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: validationResult.error.format() },
        { status: 400 }
      );
    }

    const record = await prisma.medicalRecord.create({
      data: {
        ...validationResult.data,
        createdBy: session.user.id,
      },
      include: {
        patient: true,
        doctor: true,
      },
    });

    return NextResponse.json(record);
  } catch (error) {
    console.error('Medical record creation error:', error);
    return NextResponse.json({ error: 'Failed to create medical record' }, { status: 500 });
  }
} 