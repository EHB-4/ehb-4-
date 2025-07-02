export const runtime = "nodejs";
import { NextRequest, NextResponse } from 'next/server';

interface ConsultationBooking {
  serviceType: string;
  date: string;
  time: string;
  name: string;
  email: string;
  company?: string;
  notes?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: ConsultationBooking = await request.json();

    // Validate required fields
    if (!body.serviceType || !body.date || !body.time || !body.name || !body.email) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
    }

    // Validate date format
    const selectedDate = new Date(body.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      return NextResponse.json(
        { error: 'Cannot book consultation for past dates' },
        { status: 400 }
      );
    }

    // Check if time slot is available (in real app, check against database)
    const availableSlots = [
      '09:00 AM',
      '10:00 AM',
      '11:00 AM',
      '12:00 PM',
      '01:00 PM',
      '02:00 PM',
      '03:00 PM',
      '04:00 PM',
    ];

    if (!availableSlots.includes(body.time)) {
      return NextResponse.json({ error: 'Invalid time slot' }, { status: 400 });
    }

    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Mock database save
    const booking = {
      id: Date.now().toString(),
      ...body,
      status: 'scheduled',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Mock email confirmation (in real app, use a service like SendGrid)
    console.log('Consultation booking:', booking);

    // Mock calendar integration
    console.log('Adding to calendar:', {
      title: `Consultation with ${body.name}`,
      date: body.date,
      time: body.time,
      service: body.serviceType,
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Consultation booked successfully',
        bookingId: booking.id,
        confirmationDetails: {
          date: body.date,
          time: body.time,
          service: body.serviceType,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Consultation booking error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET() {
  // Return available time slots
  const availableSlots = [
    '09:00 AM',
    '10:00 AM',
    '11:00 AM',
    '12:00 PM',
    '01:00 PM',
    '02:00 PM',
    '03:00 PM',
    '04:00 PM',
  ];

  return NextResponse.json(
    {
      availableSlots,
      message: 'Consultation API endpoint',
    },
    { status: 200 }
  );
}
