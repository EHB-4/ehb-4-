import { NextResponse } from 'next/server';

// Mock tutors data
const mockTutors = [
  {
    _id: 'tutor1',
    name: 'Dr. Sarah Johnson',
    specialization: 'Mathematics',
    experience: '8 years',
    rating: 4.9,
    hourlyRate: 75,
    available: true,
    subjects: ['Algebra', 'Calculus', 'Statistics'],
    image: '/tutors/sarah-johnson.jpg',
  },
  {
    _id: 'tutor2',
    name: 'Prof. Michael Chen',
    specialization: 'Physics',
    experience: '12 years',
    rating: 4.8,
    hourlyRate: 85,
    available: true,
    subjects: ['Mechanics', 'Thermodynamics', 'Quantum Physics'],
    image: '/tutors/michael-chen.jpg',
  },
  {
    _id: 'tutor3',
    name: 'Ms. Emily Davis',
    specialization: 'English Literature',
    experience: '6 years',
    rating: 4.7,
    hourlyRate: 60,
    available: false,
    subjects: ['Creative Writing', 'Poetry', 'Shakespeare'],
    image: '/tutors/emily-davis.jpg',
  },
];

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const specialization = searchParams.get('specialization');
    const subject = searchParams.get('subject');

    let tutors = mockTutors;

    if (specialization) {
      tutors = tutors.filter(tutor => tutor.specialization === specialization);
    }

    if (subject) {
      tutors = tutors.filter(tutor => tutor.subjects.includes(subject));
    }

    return NextResponse.json({ tutors });
  } catch (error) {
    console.error('Error fetching tutors:', error);
    return NextResponse.json({ error: 'Failed to fetch tutors' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, specialization, experience, hourlyRate, subjects } = body;

    if (!name || !specialization || !experience || !hourlyRate || !subjects) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const newTutor = {
      _id: `tutor${Date.now()}`,
      name,
      specialization,
      experience,
      rating: 0,
      hourlyRate,
      available: true,
      subjects,
      image: '/tutors/default.jpg',
    };

    mockTutors.push(newTutor);

    return NextResponse.json({ tutor: newTutor });
  } catch (error) {
    console.error('Error creating tutor:', error);
    return NextResponse.json({ error: 'Failed to create tutor' }, { status: 500 });
  }
}

// PATCH /api/tutors - Update tutor profile
export async function PATCH(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { name, subjects, experience, education, bio } = body;

    const client = await clientPromise;
    const db = client.db();

    // Check if tutor exists and belongs to user
    const tutor = await db.collection('tutors').findOne({ userId: session.user.id });
    if (!tutor) {
      return NextResponse.json({ error: 'Tutor profile not found' }, { status: 404 });
    }

    // Update tutor profile
    const updatedTutor = await db.collection('tutors').findOneAndUpdate(
      { _id: tutor._id },
      {
        $set: {
          name,
          subjects,
          experience,
          education,
          bio,
          updatedAt: new Date(),
        },
      },
      { returnDocument: 'after' }
    );

    return NextResponse.json({ tutor: updatedTutor });
  } catch (error) {
    console.error('Error updating tutor:', error);
    return NextResponse.json({ error: 'Failed to update tutor profile' }, { status: 500 });
  }
}

// DELETE /api/tutors - Delete tutor profile
export async function DELETE() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const client = await clientPromise;
    const db = client.db();

    // Check if tutor exists and belongs to user
    const tutor = await db.collection('tutors').findOne({ userId: session.user.id });
    if (!tutor) {
      return NextResponse.json({ error: 'Tutor profile not found' }, { status: 404 });
    }

    // Check if tutor has any active courses
    const activeCourses = await db
      .collection('courses')
      .find({
        tutorId: tutor._id,
        status: 'active',
      })
      .toArray();

    if (activeCourses.length > 0) {
      return NextResponse.json(
        { error: 'Cannot delete profile with active courses' },
        { status: 400 }
      );
    }

    await db.collection('tutors').deleteOne({ _id: tutor._id });
    return NextResponse.json({ message: 'Tutor profile deleted successfully' });
  } catch (error) {
    console.error('Error deleting tutor:', error);
    return NextResponse.json({ error: 'Failed to delete tutor profile' }, { status: 500 });
  }
}
