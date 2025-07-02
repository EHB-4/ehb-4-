import { NextResponse } from 'next/server';

// Mock data for frontend development
const mockAppointments = [
  {
    _id: '1',
    doctorId: 'doc1',
    patientId: 'user123',
    doctor: {
      name: 'Dr. Sarah Johnson',
      specialization: 'Cardiology',
      fee: 150,
    },
    date: '2024-01-15',
    timeSlot: '10:00 AM',
    status: 'confirmed',
    createdAt: new Date().toISOString(),
  },
  {
    _id: '2',
    doctorId: 'doc2',
    patientId: 'user123',
    doctor: {
      name: 'Dr. Michael Chen',
      specialization: 'Dermatology',
      fee: 120,
    },
    date: '2024-01-20',
    timeSlot: '2:00 PM',
    status: 'pending',
    createdAt: new Date().toISOString(),
  },
];

// GET /api/appointments
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const isMyAppointments = searchParams.get('my-appointments') === 'true';

    // Mock authentication check
    const userId = 'user123'; // In real app, get from session

    let appointments = mockAppointments;
    if (isMyAppointments) {
      appointments = mockAppointments.filter(apt => apt.patientId === userId);
    }

    return NextResponse.json({ appointments });
  } catch (error) {
    console.error('Error fetching appointments:', error);
    return NextResponse.json({ error: 'Failed to fetch appointments' }, { status: 500 });
  }
}

// POST /api/appointments
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { doctorId, date, timeSlot } = body;

    if (!doctorId || !date || !timeSlot) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Mock appointment creation
    const newAppointment = {
      _id: Date.now().toString(),
      doctorId,
      patientId: 'user123',
      doctor: {
        name: 'Dr. Mock Doctor',
        specialization: 'General Medicine',
        fee: 100,
      },
      date,
      timeSlot,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    mockAppointments.push(newAppointment);

    return NextResponse.json({ appointment: newAppointment });
  } catch (error) {
    console.error('Error creating appointment:', error);
    return NextResponse.json({ error: 'Failed to create appointment' }, { status: 500 });
  }
}

// PATCH /api/appointments/[id]
export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();
    const { date, timeSlot, status } = body;

    const appointmentIndex = mockAppointments.findIndex(apt => apt._id === params.id);

    if (appointmentIndex === -1) {
      return NextResponse.json({ error: 'Appointment not found' }, { status: 404 });
    }

    // Update appointment
    mockAppointments[appointmentIndex] = {
      ...mockAppointments[appointmentIndex],
      date: date || mockAppointments[appointmentIndex].date,
      timeSlot: timeSlot || mockAppointments[appointmentIndex].timeSlot,
      status: status || mockAppointments[appointmentIndex].status,
    };

    return NextResponse.json({ appointment: mockAppointments[appointmentIndex] });
  } catch (error) {
    console.error('Error updating appointment:', error);
    return NextResponse.json({ error: 'Failed to update appointment' }, { status: 500 });
  }
}

// DELETE /api/appointments/[id]
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const appointmentIndex = mockAppointments.findIndex(apt => apt._id === params.id);

    if (appointmentIndex === -1) {
      return NextResponse.json({ error: 'Appointment not found' }, { status: 404 });
    }

    // Remove appointment
    const deletedAppointment = mockAppointments.splice(appointmentIndex, 1)[0];

    return NextResponse.json({ appointment: deletedAppointment });
  } catch (error) {
    console.error('Error deleting appointment:', error);
    return NextResponse.json({ error: 'Failed to delete appointment' }, { status: 500 });
  }
}
