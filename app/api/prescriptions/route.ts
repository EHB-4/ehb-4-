import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { z } from 'zod';

import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

const prescriptionSchema = z.object({
  patientId: z.string(),
  doctorId: z.string(),
  medications: z.array(
    z.object({
      name: z.string(),
      dosage: z.string(),
      frequency: z.string(),
      duration: z.string(),
      instructions: z.string().optional(),
    })
  ),
  diagnosis: z.string(),
  notes: z.string().optional(),
  validUntil: z.string().datetime(),
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

    const prescriptions = await prisma.prescription.findMany({
      where: {
        OR: [{ patientId: patientId || undefined }, { doctorId: doctorId || undefined }],
        validUntil: {
          gte: new Date(),
        },
      },
      include: {
        patient: true,
        doctor: true,
        medications: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(prescriptions);
  } catch (error) {
    console.error('Prescriptions fetch error:', error);
    return NextResponse.json({ error: 'Failed to fetch prescriptions' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const validationResult = prescriptionSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: validationResult.error.format() },
        { status: 400 }
      );
    }

    const prescription = await prisma.prescription.create({
      data: {
        ...validationResult.data,
        createdBy: session.user.id,
        medications: {
          create: validationResult.data.medications,
        },
      },
      include: {
        patient: true,
        doctor: true,
        medications: true,
      },
    });

    return NextResponse.json(prescription);
  } catch (error) {
    console.error('Prescription creation error:', error);
    return NextResponse.json({ error: 'Failed to create prescription' }, { status: 500 });
  }
}
