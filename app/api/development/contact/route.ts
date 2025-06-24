import { NextRequest, NextResponse } from 'next/server';

interface ContactSubmission {
  name: string;
  email: string;
  company?: string;
  projectType: string;
  budget?: string;
  timeline?: string;
  description: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactSubmission = await request.json();

    // Validate required fields
    if (!body.name || !body.email || !body.projectType || !body.description) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
    }

    // In a real application, you would:
    // 1. Save to database
    // 2. Send email notifications
    // 3. Create CRM entry
    // 4. Log the submission

    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Mock database save
    const submission = {
      id: Date.now().toString(),
      ...body,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    // Mock email notification (in real app, use a service like SendGrid)
    console.log('Contact form submission:', submission);

    // Mock CRM integration
    console.log('Creating CRM entry for:', body.name);

    return NextResponse.json(
      {
        success: true,
        message: 'Contact form submitted successfully',
        submissionId: submission.id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Contact form submission error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET() {
  // In a real application, this would return contact submissions
  // For now, return a simple response
  return NextResponse.json({ message: 'Contact API endpoint' }, { status: 200 });
}
