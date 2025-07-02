import { NextResponse } from 'next/server';

// Mock enrollments data
const mockEnrollments = [
  {
    _id: '1',
    courseId: 'course1',
    studentId: 'user123',
    course: {
      title: 'Introduction to Web Development',
      instructor: 'Prof. John Smith',
      price: 299,
    },
    status: 'active',
    enrolledAt: '2024-01-10',
    progress: 65,
  },
  {
    _id: '2',
    courseId: 'course2',
    studentId: 'user123',
    course: {
      title: 'Advanced React Development',
      instructor: 'Prof. Sarah Johnson',
      price: 399,
    },
    status: 'completed',
    enrolledAt: '2023-12-15',
    progress: 100,
  },
];

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const studentId = searchParams.get('studentId');

    let enrollments = mockEnrollments;

    if (studentId) {
      enrollments = mockEnrollments.filter(enrollment => enrollment.studentId === studentId);
    }

    return NextResponse.json({ enrollments });
  } catch (error) {
    console.error('Error fetching enrollments:', error);
    return NextResponse.json({ error: 'Failed to fetch enrollments' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { courseId } = body;

    if (!courseId) {
      return NextResponse.json({ error: 'Course ID is required' }, { status: 400 });
    }

    const newEnrollment = {
      _id: Date.now().toString(),
      courseId,
      studentId: 'user123',
      course: {
        title: 'New Course',
        instructor: 'Prof. Instructor',
        price: 250,
      },
      status: 'active',
      enrolledAt: new Date().toISOString().split('T')[0],
      progress: 0,
    };

    mockEnrollments.push(newEnrollment);

    return NextResponse.json({ enrollment: newEnrollment });
  } catch (error) {
    console.error('Error creating enrollment:', error);
    return NextResponse.json({ error: 'Failed to create enrollment' }, { status: 500 });
  }
}

// PATCH /api/enrollments/[id]
export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { status, completion, rating } = body;

    const client = await clientPromise;
    const db = client.db();

    // Check if enrollment exists and belongs to user
    const enrollment = await db.collection('enrollments').findOne({
      _id: new ObjectId(params.id),
      studentId: session.user.id,
    });

    if (!enrollment) {
      return NextResponse.json({ error: 'Enrollment not found' }, { status: 404 });
    }

    // Update enrollment
    const updatedEnrollment = await db.collection('enrollments').findOneAndUpdate(
      { _id: new ObjectId(params.id) },
      {
        $set: {
          ...(status && { status }),
          ...(completion && { completion }),
          ...(rating && { rating }),
          updatedAt: new Date(),
        },
      },
      { returnDocument: 'after' }
    );

    // If rating is provided, update course's average rating
    if (rating) {
      const course = await db.collection('courses').findOne({ _id: enrollment.courseId });

      if (course) {
        const enrollments = await db
          .collection('enrollments')
          .find({ courseId: enrollment.courseId, rating: { $exists: true } })
          .toArray();

        const averageRating =
          enrollments.reduce((sum, e) => sum + e.rating, 0) / enrollments.length;

        await db
          .collection('courses')
          .updateOne({ _id: enrollment.courseId }, { $set: { rating: averageRating } });
      }
    }

    return NextResponse.json({ enrollment: updatedEnrollment });
  } catch (error) {
    console.error('Error updating enrollment:', error);
    return NextResponse.json({ error: 'Failed to update enrollment' }, { status: 500 });
  }
}

// DELETE /api/enrollments/[id]
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const client = await clientPromise;
    const db = client.db();

    // Check if enrollment exists and belongs to user
    const enrollment = await db.collection('enrollments').findOne({
      _id: new ObjectId(params.id),
      studentId: session.user.id,
    });

    if (!enrollment) {
      return NextResponse.json({ error: 'Enrollment not found' }, { status: 404 });
    }

    // Check if enrollment is active
    if (enrollment.status !== 'active') {
      return NextResponse.json({ error: 'Can only cancel active enrollments' }, { status: 400 });
    }

    // Start a session for transaction
    const dbSession = await client.startSession();
    try {
      await dbSession.withTransaction(async () => {
        // Update enrollment status
        await db.collection('enrollments').updateOne(
          { _id: new ObjectId(params.id) },
          {
            $set: {
              status: 'cancelled',
              updatedAt: new Date(),
            },
          },
          { session: dbSession }
        );

        // Get course details
        const course = await db.collection('courses').findOne({ _id: enrollment.courseId });

        if (course) {
          // Refund student
          await db.collection('wallets').updateOne(
            { userId: session.user.id },
            {
              $inc: { balance: course.price },
              $push: {
                transactions: {
                  type: 'course_refund',
                  amount: course.price,
                  description: `Refund for course: ${course.title}`,
                  createdAt: new Date(),
                },
              },
            },
            { session: dbSession }
          );

          // Deduct from tutor's wallet
          const tutor = await db.collection('tutors').findOne({ _id: course.tutorId });

          if (tutor) {
            await db.collection('wallets').updateOne(
              { userId: tutor.userId },
              {
                $inc: { balance: -course.price * 0.7 },
                $push: {
                  transactions: {
                    type: 'course_refund_deduction',
                    amount: -course.price * 0.7,
                    description: `Refund deduction for course: ${course.title}`,
                    createdAt: new Date(),
                  },
                },
              },
              { session: dbSession }
            );
          }
        }
      });
    } finally {
      await dbSession.endSession();
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error cancelling enrollment:', error);
    return NextResponse.json({ error: 'Failed to cancel enrollment' }, { status: 500 });
  }
}
