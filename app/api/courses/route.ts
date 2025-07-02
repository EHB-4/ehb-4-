import { NextResponse } from 'next/server';

// Mock courses data
const mockCourses = [
  {
    _id: '1',
    title: 'Introduction to Web Development',
    description: 'Learn the basics of HTML, CSS, and JavaScript',
    instructor: 'Prof. John Smith',
    duration: '8 weeks',
    price: 299,
    category: 'Programming',
    level: 'Beginner',
    enrolledStudents: 1250,
    rating: 4.8,
    image: '/courses/web-dev.jpg',
  },
  {
    _id: '2',
    title: 'Advanced React Development',
    description: 'Master React hooks, context, and advanced patterns',
    instructor: 'Prof. Sarah Johnson',
    duration: '10 weeks',
    price: 399,
    category: 'Programming',
    level: 'Advanced',
    enrolledStudents: 890,
    rating: 4.9,
    image: '/courses/react.jpg',
  },
  {
    _id: '3',
    title: 'Data Science Fundamentals',
    description: 'Learn Python, statistics, and machine learning basics',
    instructor: 'Prof. Michael Chen',
    duration: '12 weeks',
    price: 499,
    category: 'Data Science',
    level: 'Intermediate',
    enrolledStudents: 2100,
    rating: 4.7,
    image: '/courses/data-science.jpg',
  },
];

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const level = searchParams.get('level');

    let courses = mockCourses;

    if (category) {
      courses = courses.filter(course => course.category === category);
    }

    if (level) {
      courses = courses.filter(course => course.level === level);
    }

    return NextResponse.json({ courses });
  } catch (error) {
    console.error('Error fetching courses:', error);
    return NextResponse.json({ error: 'Failed to fetch courses' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, description, instructor, duration, price, category, level } = body;

    if (!title || !description || !instructor || !duration || !price || !category || !level) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const newCourse = {
      _id: Date.now().toString(),
      title,
      description,
      instructor,
      duration,
      price,
      category,
      level,
      enrolledStudents: 0,
      rating: 0,
      image: '/courses/default.jpg',
    };

    mockCourses.push(newCourse);

    return NextResponse.json({ course: newCourse });
  } catch (error) {
    console.error('Error creating course:', error);
    return NextResponse.json({ error: 'Failed to create course' }, { status: 500 });
  }
}

// PATCH /api/courses/[id]
export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { title, description, subject, price, schedule, city, mode } = body;

    const client = await clientPromise;
    const db = client.db();

    // Check if course exists and belongs to user
    const tutor = await db.collection('tutors').findOne({ userId: session.user.id });

    if (!tutor) {
      return NextResponse.json({ error: 'Tutor profile not found' }, { status: 404 });
    }

    const course = await db.collection('courses').findOne({
      _id: new ObjectId(params.id),
      tutorId: tutor._id,
    });

    if (!course) {
      return NextResponse.json({ error: 'Course not found' }, { status: 404 });
    }

    // Update course
    const updatedCourse = await db.collection('courses').findOneAndUpdate(
      { _id: new ObjectId(params.id) },
      {
        $set: {
          ...(title && { title }),
          ...(description && { description }),
          ...(subject && { subject }),
          ...(price && { price }),
          ...(schedule && { schedule }),
          ...(city && { city }),
          ...(mode && { mode }),
          updatedAt: new Date(),
        },
      },
      { returnDocument: 'after' }
    );

    return NextResponse.json({ course: updatedCourse });
  } catch (error) {
    console.error('Error updating course:', error);
    return NextResponse.json({ error: 'Failed to update course' }, { status: 500 });
  }
}

// DELETE /api/courses/[id]
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const client = await clientPromise;
    const db = client.db();

    // Check if course exists and belongs to user
    const tutor = await db.collection('tutors').findOne({ userId: session.user.id });

    if (!tutor) {
      return NextResponse.json({ error: 'Tutor profile not found' }, { status: 404 });
    }

    const course = await db.collection('courses').findOne({
      _id: new ObjectId(params.id),
      tutorId: tutor._id,
    });

    if (!course) {
      return NextResponse.json({ error: 'Course not found' }, { status: 404 });
    }

    // Check if course has any active enrollments
    const activeEnrollments = await db.collection('enrollments').findOne({
      courseId: new ObjectId(params.id),
      status: 'active',
    });

    if (activeEnrollments) {
      return NextResponse.json(
        { error: 'Cannot delete course with active enrollments' },
        { status: 400 }
      );
    }

    // Delete course
    await db.collection('courses').deleteOne({
      _id: new ObjectId(params.id),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting course:', error);
    return NextResponse.json({ error: 'Failed to delete course' }, { status: 500 });
  }
}
