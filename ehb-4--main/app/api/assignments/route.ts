import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const assignmentSchema = z.object({
  courseId: z.string(),
  title: z.string().min(1),
  description: z.string(),
  dueDate: z.string().datetime(),
  totalPoints: z.number().min(0),
  attachments: z.array(z.string()).optional(),
  requirements: z.array(z.string()).optional(),
});

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const courseId = searchParams.get('courseId');
    const tutorId = searchParams.get('tutorId');

    if (!courseId && !tutorId) {
      return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 });
    }

    const assignments = await prisma.assignment.findMany({
      where: {
        OR: [
          { courseId: courseId || undefined },
          { tutorId: tutorId || undefined },
        ],
      },
      include: {
        course: true,
        tutor: true,
        submissions: {
          include: {
            student: true,
          },
        },
      },
      orderBy: {
        dueDate: 'asc',
      },
    });

    return NextResponse.json(assignments);
  } catch (error) {
    console.error('Assignments fetch error:', error);
    return NextResponse.json({ error: 'Failed to fetch assignments' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const validationResult = assignmentSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: validationResult.error.format() },
        { status: 400 }
      );
    }

    const assignment = await prisma.assignment.create({
      data: {
        ...validationResult.data,
        tutorId: session.user.id,
      },
      include: {
        course: true,
        tutor: true,
      },
    });

    return NextResponse.json(assignment);
  } catch (error) {
    console.error('Assignment creation error:', error);
    return NextResponse.json({ error: 'Failed to create assignment' }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const assignmentId = searchParams.get('id');

    if (!assignmentId) {
      return NextResponse.json({ error: 'Missing assignment ID' }, { status: 400 });
    }

    const body = await req.json();
    const validationResult = assignmentSchema.partial().safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: validationResult.error.format() },
        { status: 400 }
      );
    }

    const assignment = await prisma.assignment.update({
      where: {
        id: assignmentId,
        tutorId: session.user.id,
      },
      data: validationResult.data,
      include: {
        course: true,
        tutor: true,
      },
    });

    return NextResponse.json(assignment);
  } catch (error) {
    console.error('Assignment update error:', error);
    return NextResponse.json({ error: 'Failed to update assignment' }, { status: 500 });
  }
} 