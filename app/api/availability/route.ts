import { NextResponse } from 'next/server';

// Mock availability data
const mockAvailability = {
  doc1: {
    '2024-01-15': ['09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM'],
    '2024-01-16': ['09:00 AM', '10:00 AM', '02:00 PM', '03:00 PM', '04:00 PM'],
    '2024-01-17': ['09:00 AM', '11:00 AM', '02:00 PM', '04:00 PM'],
  },
  doc2: {
    '2024-01-15': ['10:00 AM', '11:00 AM', '01:00 PM', '02:00 PM'],
    '2024-01-16': ['09:00 AM', '10:00 AM', '03:00 PM', '04:00 PM'],
    '2024-01-17': ['09:00 AM', '10:00 AM', '02:00 PM', '03:00 PM'],
  },
};

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const doctorId = searchParams.get('doctorId');
    const date = searchParams.get('date');

    if (!doctorId || !date) {
      return NextResponse.json({ error: 'Doctor ID and date are required' }, { status: 400 });
    }

    const availability = mockAvailability[doctorId as keyof typeof mockAvailability]?.[date] || [];

    return NextResponse.json({ availability });
  } catch (error) {
    console.error('Error fetching availability:', error);
    return NextResponse.json({ error: 'Failed to fetch availability' }, { status: 500 });
  }
}

// POST /api/availability
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { day, timeSlots } = body;

    if (!day || !timeSlots || !Array.isArray(timeSlots)) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db();

    // Check if doctor exists
    const doctor = await db.collection('doctors').findOne({ userId: session.user.id });

    if (!doctor) {
      return NextResponse.json({ error: 'Doctor not found' }, { status: 404 });
    }

    // Update or create availability
    const availability: Availability = {
      _id: new ObjectId(),
      doctorId: doctor._id as unknown as ObjectId,
      day,
      timeSlots,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await db.collection('availability').updateOne(
      {
        doctorId: doctor._id,
        day,
      },
      { $set: availability },
      { upsert: true }
    );

    return NextResponse.json({ availability });
  } catch (error) {
    console.error('Error updating availability:', error);
    return NextResponse.json({ error: 'Failed to update availability' }, { status: 500 });
  }
}
