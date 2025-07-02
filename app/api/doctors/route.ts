import { NextResponse } from 'next/server';

// Mock doctors data
const mockDoctors = [
  {
    _id: 'doc1',
    name: 'Dr. Sarah Johnson',
    specialization: 'Cardiology',
    experience: '15 years',
    fee: 150,
    rating: 4.8,
    patients: 1250,
    image: '/doctors/sarah-johnson.jpg',
    available: true,
  },
  {
    _id: 'doc2',
    name: 'Dr. Michael Chen',
    specialization: 'Dermatology',
    experience: '12 years',
    fee: 120,
    rating: 4.7,
    patients: 980,
    image: '/doctors/michael-chen.jpg',
    available: true,
  },
  {
    _id: 'doc3',
    name: 'Dr. Emily Davis',
    specialization: 'Pediatrics',
    experience: '10 years',
    fee: 100,
    rating: 4.9,
    patients: 2100,
    image: '/doctors/emily-davis.jpg',
    available: true,
  },
];

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const specialization = searchParams.get('specialization');

    let doctors = mockDoctors;

    if (specialization) {
      doctors = doctors.filter(doctor => doctor.specialization === specialization);
    }

    return NextResponse.json({ doctors });
  } catch (error) {
    console.error('Error fetching doctors:', error);
    return NextResponse.json({ error: 'Failed to fetch doctors' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, specialization, experience, fee } = body;

    if (!name || !specialization || !experience || !fee) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const newDoctor = {
      _id: `doc${Date.now()}`,
      name,
      specialization,
      experience,
      fee,
      rating: 0,
      patients: 0,
      image: '/doctors/default.jpg',
      available: true,
    };

    mockDoctors.push(newDoctor);

    return NextResponse.json({ doctor: newDoctor });
  } catch (error) {
    console.error('Error creating doctor:', error);
    return NextResponse.json({ error: 'Failed to create doctor' }, { status: 500 });
  }
}

// PATCH /api/doctors/[id]
export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { name, city, specialty, hospital, fee } = body;

    const client = await clientPromise;
    const db = client.db();

    // Check if doctor exists and belongs to user
    const doctor = await db.collection('doctors').findOne({
      _id: new ObjectId(params.id),
      userId: session.user.id,
    });

    if (!doctor) {
      return NextResponse.json({ error: 'Doctor not found' }, { status: 404 });
    }

    // Update doctor profile
    const updatedDoctor = await db.collection('doctors').findOneAndUpdate(
      { _id: new ObjectId(params.id) },
      {
        $set: {
          ...(name && { name }),
          ...(city && { city }),
          ...(specialty && { specialty }),
          ...(hospital && { hospital }),
          ...(fee && { fee }),
          updatedAt: new Date(),
        },
      },
      { returnDocument: 'after' }
    );

    return NextResponse.json({ doctor: updatedDoctor });
  } catch (error) {
    console.error('Error updating doctor:', error);
    return NextResponse.json({ error: 'Failed to update doctor' }, { status: 500 });
  }
}

// DELETE /api/doctors/[id]
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const client = await clientPromise;
    const db = client.db();

    // Check if doctor exists and belongs to user
    const doctor = await db.collection('doctors').findOne({
      _id: new ObjectId(params.id),
      userId: session.user.id,
    });

    if (!doctor) {
      return NextResponse.json({ error: 'Doctor not found' }, { status: 404 });
    }

    // Check if doctor has any pending appointments
    const pendingAppointments = await db.collection('appointments').findOne({
      doctorId: new ObjectId(params.id),
      status: 'pending',
    });

    if (pendingAppointments) {
      return NextResponse.json(
        { error: 'Cannot delete doctor with pending appointments' },
        { status: 400 }
      );
    }

    // Delete doctor profile
    await db.collection('doctors').deleteOne({
      _id: new ObjectId(params.id),
    });

    // Delete doctor's availability
    await db.collection('availability').deleteMany({
      doctorId: new ObjectId(params.id),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting doctor:', error);
    return NextResponse.json({ error: 'Failed to delete doctor' }, { status: 500 });
  }
}
