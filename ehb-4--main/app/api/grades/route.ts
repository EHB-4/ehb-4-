import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const gradeSchema = z.object({
  studentId: z.string(),
  courseId: z.string(),
  assignmentId: z.string(),
  score: z.number().min(0),
  feedback: z.string().optional(),
  gradedBy: z.string(),
});

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const studentId = searchParams.get('studentId');
    const courseId = searchParams.get('courseId');
    const assignmentId = searchParams.get('assignmentId');

    if (!studentId && !courseId && !assignmentId) {
      return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 });
    }

    const grades = await prisma.grade.findMany({
      where: {
        OR: [
          { studentId: studentId || undefined },
          { courseId: courseId || undefined },
          { assignmentId: assignmentId || undefined },
        ],
      },
      include: {
        student: true,
        course: true,
        assignment: true,
        gradedBy: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(grades);
  } catch (error) {
    console.error('Grades fetch error:', error);
    return NextResponse.json({ error: 'Failed to fetch grades' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const validationResult = gradeSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: validationResult.error.format() },
        { status: 400 }
      );
    }

    // Check if user has permission to grade
    const isTutor = await prisma.course.findFirst({
      where: {
        id: validationResult.data.courseId,
        tutorId: session.user.id,
      },
    });

    if (!isTutor) {
      return NextResponse.json({ error: 'Unauthorized to grade this assignment' }, { status: 403 });
    }

    const grade = await prisma.grade.create({
      data: {
        ...validationResult.data,
        gradedBy: session.user.id,
      },
      include: {
        student: true,
        course: true,
        assignment: true,
        gradedBy: true,
      },
    });

    return NextResponse.json(grade);
  } catch (error) {
    console.error('Grade creation error:', error);
    return NextResponse.json({ error: 'Failed to create grade' }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const gradeId = searchParams.get('id');

    if (!gradeId) {
      return NextResponse.json({ error: 'Missing grade ID' }, { status: 400 });
    }

    const body = await req.json();
    const validationResult = gradeSchema.partial().safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: validationResult.error.format() },
        { status: 400 }
      );
    }

    // Check if user has permission to update grade
    const existingGrade = await prisma.grade.findUnique({
      where: { id: gradeId },
      include: { course: true },
    });

    if (!existingGrade || existingGrade.course.tutorId !== session.user.id) {
      return NextResponse.json({ error: 'Unauthorized to update this grade' }, { status: 403 });
    }

    const grade = await prisma.grade.update({
      where: { id: gradeId },
      data: validationResult.data,
      include: {
        student: true,
        course: true,
        assignment: true,
        gradedBy: true,
      },
    });

    return NextResponse.json(grade);
  } catch (error) {
    console.error('Grade update error:', error);
    return NextResponse.json({ error: 'Failed to update grade' }, { status: 500 });
  }
} 