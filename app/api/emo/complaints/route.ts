import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

// EMO Complaints API Route Handler
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const status = searchParams.get('status');
    const type = searchParams.get('type');
    const priority = searchParams.get('priority');

    const skip = (page - 1) * limit;

    // Build where clause
    const where: any = {
      userId: session.user.id,
    };

    if (status) {
      where.status = status;
    }

    if (type) {
      where.type = type;
    }

    if (priority) {
      where.priority = priority;
    }

    // Get complaints with pagination
    const [complaints, total] = await Promise.all([
      prisma.complaint.findMany({
        where,
        include: {
          order: {
            select: {
              id: true,
              status: true,
              total: true,
            },
          },
        },
        skip,
        take: limit,
        orderBy: {
          createdAt: 'desc',
        },
      }),
      prisma.complaint.count({ where }),
    ]);

    return NextResponse.json({
      success: true,
      data: {
        complaints,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
      },
    });
  } catch (error) {
    console.error('EMO Complaints API Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();

    // Validate input
    const complaintSchema = z.object({
      title: z.string().min(1, 'Title is required'),
      description: z.string().min(1, 'Description is required'),
      type: z.enum(['DELIVERY', 'QUALITY', 'PAYMENT', 'SERVICE', 'TECHNICAL', 'OTHER']),
      priority: z.enum(['LOW', 'MEDIUM', 'HIGH', 'URGENT']),
      orderId: z.string().optional(),
      attachments: z.array(z.string()).optional(),
    });

    const validatedData = complaintSchema.parse(body);

    // If orderId is provided, verify it belongs to the user
    if (validatedData.orderId) {
      const order = await prisma.order.findFirst({
        where: {
          id: validatedData.orderId,
          userId: session.user.id,
        },
      });

      if (!order) {
        return NextResponse.json({ error: 'Order not found' }, { status: 404 });
      }
    }

    // Generate case number
    const caseNo = `EMO-${Date.now()}-${Math.random().toString(36).substr(2, 5).toUpperCase()}`;

    // Create complaint
    const complaint = await prisma.complaint.create({
      data: {
        userId: session.user.id,
        subject: validatedData.title,
        description: validatedData.description,
        type: validatedData.type,
        priority: validatedData.priority,
        orderId: validatedData.orderId || null,
        caseNo,
        status: 'FILED',
      },
      include: {
        order: {
          select: {
            id: true,
            status: true,
            total: true,
          },
        },
      },
    });

    return NextResponse.json({
      success: true,
      data: complaint,
      message: 'Complaint filed successfully',
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors[0].message }, { status: 400 });
    }
    console.error('EMO Complaints API Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { id, ...updateData } = body;

    if (!id) {
      return NextResponse.json({ error: 'Complaint ID is required' }, { status: 400 });
    }

    // Check if complaint belongs to user
    const existingComplaint = await prisma.complaint.findFirst({
      where: {
        id,
        userId: session.user.id || '',
      },
    });

    if (!existingComplaint) {
      return NextResponse.json({ error: 'Complaint not found' }, { status: 404 });
    }

    // Only allow updating certain fields
    const allowedUpdates: any = {};

    if (updateData.title !== undefined) {
      allowedUpdates.subject = updateData.title;
    }
    if (updateData.description !== undefined) {
      allowedUpdates.description = updateData.description;
    }
    if (updateData.priority !== undefined) {
      allowedUpdates.priority = updateData.priority;
    }

    // Update complaint
    const complaint = await prisma.complaint.update({
      where: { id },
      data: allowedUpdates,
    });

    return NextResponse.json({
      success: true,
      data: complaint,
      message: 'Complaint updated successfully',
    });
  } catch (error) {
    console.error('EMO Complaints API Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Complaint ID is required' }, { status: 400 });
    }

    // Check if complaint belongs to user
    const existingComplaint = await prisma.complaint.findFirst({
      where: {
        id,
        userId: session.user.id || '',
      },
    });

    if (!existingComplaint) {
      return NextResponse.json({ error: 'Complaint not found' }, { status: 404 });
    }

    // Only allow deletion if complaint is filed
    if (existingComplaint.status !== 'FILED') {
      return NextResponse.json(
        { error: 'Cannot delete complaint that is not filed' },
        { status: 400 }
      );
    }

    // Delete complaint
    await prisma.complaint.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: 'Complaint deleted successfully',
    });
  } catch (error) {
    console.error('EMO Complaints API Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
