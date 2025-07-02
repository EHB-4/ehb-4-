export const runtime = "nodejs";
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

// Mock database for demonstration
const orders = [
  {
    id: '1',
    customerName: 'John Doe',
    orderNumber: 'ORD-001',
    status: 'pending',
    total: 299.99,
    date: '2024-01-15',
    items: 3,
    customerEmail: 'john@example.com',
    shippingAddress: '123 Main St, City, State 12345',
    items: [
      { id: '1', name: 'Premium Headphones', quantity: 1, price: 199.99 },
      { id: '2', name: 'Wireless Mouse', quantity: 2, price: 50.0 },
    ],
  },
  {
    id: '2',
    customerName: 'Jane Smith',
    orderNumber: 'ORD-002',
    status: 'processing',
    total: 149.5,
    date: '2024-01-15',
    items: 2,
    customerEmail: 'jane@example.com',
    shippingAddress: '456 Oak Ave, City, State 12345',
    items: [
      { id: '3', name: 'Laptop Stand', quantity: 1, price: 89.99 },
      { id: '4', name: 'USB Cable', quantity: 1, price: 59.51 },
    ],
  },
];

// Validation schema
const OrderSchema = z.object({
  customerName: z.string().min(2, 'Customer name must be at least 2 characters'),
  customerEmail: z.string().email('Invalid email address'),
  shippingAddress: z.string().min(10, 'Shipping address must be at least 10 characters'),
  items: z
    .array(
      z.object({
        id: z.string(),
        name: z.string(),
        quantity: z.number().min(1),
        price: z.number().min(0),
      })
    )
    .min(1, 'At least one item is required'),
});

// EMO Orders API Route Handler
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
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');

    const skip = (page - 1) * limit;

    // Build where clause for orders that contain user's products
    const where: any = {
      items: {
        some: {
          product: {
            sellerId: session.user.id,
          },
        },
      },
    };

    if (status) {
      where.status = status;
    }

    if (startDate && endDate) {
      where.createdAt = {
        gte: new Date(startDate),
        lte: new Date(endDate),
      };
    }

    // Get orders with pagination
    const [orders, total] = await Promise.all([
      prisma.order.findMany({
        where,
        include: {
          user: {
            select: {
              name: true,
              email: true,
            },
          },
          items: {
            include: {
              product: {
                select: {
                  name: true,
                  images: true,
                  sellerId: true,
                },
              },
            },
          },
        },
        skip,
        take: limit,
        orderBy: {
          createdAt: 'desc',
        },
      }),
      prisma.order.count({ where }),
    ]);

    // Filter and calculate stats for each order
    const ordersWithStats = orders.map(order => {
      const userProducts = order.items.filter(item => item.product.sellerId === session.user.id);
      const userTotal = userProducts.reduce((sum, item) => sum + item.price * item.quantity, 0);
      const userCommission = userProducts.reduce((sum, item) => {
        const commission = item.product.commission || 0.05;
        return sum + item.price * item.quantity * commission;
      }, 0);

      return {
        ...order,
        userProducts,
        userTotal,
        userCommission,
        totalItems: userProducts.length,
      };
    });

    return NextResponse.json({
      success: true,
      data: {
        orders: ordersWithStats,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
      },
    });
  } catch (error) {
    console.error('EMO Orders API Error:', error);
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

    // Validate request data
    const validatedData = OrderSchema.parse(body);

    // Create new order
    const newOrder = {
      id: Date.now().toString(),
      orderNumber: `ORD-${String(orders.length + 1).padStart(3, '0')}`,
      status: 'pending',
      date: new Date().toISOString().split('T')[0],
      total: validatedData.items.reduce((sum, item) => sum + item.price * item.quantity, 0),
      items: validatedData.items.length,
      ...validatedData,
    };

    orders.push(newOrder);

    return NextResponse.json(
      {
        success: true,
        data: newOrder,
        message: 'Order created successfully',
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('POST /api/emo/orders error:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: 'Validation failed', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: false, error: 'Failed to create order' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json({ error: 'Order ID and status are required' }, { status: 400 });
    }

    // Check if order contains user's products
    const existingOrder = await prisma.order.findFirst({
      where: {
        id,
        items: {
          some: {
            product: {
              sellerId: session.user.id,
            },
          },
        },
      },
    });

    if (!existingOrder) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    // Update order status
    const order = await prisma.order.update({
      where: { id },
      data: { status },
    });

    return NextResponse.json({
      success: true,
      data: order,
      message: 'Order status updated successfully',
    });
  } catch (error) {
    console.error('EMO Orders API Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
