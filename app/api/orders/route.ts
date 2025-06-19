import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

// Validation schemas
const orderItemSchema = z.object({
  productId: z.string().min(1, 'Product ID is required'),
  quantity: z.number().int().positive('Quantity must be positive'),
  price: z.number().positive('Price must be positive'),
  name: z.string().min(1, 'Product name is required'),
  shopId: z.string().min(1, 'Shop ID is required'),
});

const createOrderSchema = z.object({
  items: z.array(orderItemSchema).min(1, 'At least one item is required'),
  paymentMethod: z.enum(['wallet', 'card', 'paypal']),
  shippingAddress: z.string().min(1, 'Shipping address is required'),
  totalAmount: z.number().positive('Total amount must be positive'),
});

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const status = searchParams.get('status') || '';

    // Build filter conditions
    const where: any = {
      userId: session.user.id,
    };

    if (status) {
      where.status = status;
    }

    // Get orders with pagination
    const [orders, total] = await Promise.all([
      prisma.order.findMany({
        where,
        include: {
          items: {
            include: {
              product: {
                select: {
                  id: true,
                  name: true,
                  image: true,
                  shop: {
                    select: {
                      id: true,
                      name: true,
                    },
                  },
                },
              },
            },
          },
        },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.order.count({ where }),
    ]);

    return NextResponse.json({
      orders,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Orders fetch error:', error);
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const validatedData = createOrderSchema.parse(body);

    // Check wallet balance if payment method is wallet
    if (validatedData.paymentMethod === 'wallet') {
      const wallet = await prisma.wallet.findUnique({
        where: { userId: session.user.id },
      });

      if (!wallet || wallet.balance < validatedData.totalAmount) {
        return NextResponse.json({ error: 'Insufficient wallet balance' }, { status: 400 });
      }
    }

    // Create order with items
    const order = await prisma.order.create({
      data: {
        userId: session.user.id,
        status: 'pending',
        paymentMethod: validatedData.paymentMethod,
        shippingAddress: validatedData.shippingAddress,
        totalAmount: validatedData.totalAmount,
        items: {
          create: validatedData.items.map(item => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
            name: item.name,
            shopId: item.shopId,
          })),
        },
      },
      include: {
        items: {
          include: {
            product: {
              select: {
                id: true,
                name: true,
                image: true,
                shop: {
                  select: {
                    id: true,
                    name: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    // Deduct from wallet if payment method is wallet
    if (validatedData.paymentMethod === 'wallet') {
      await prisma.wallet.update({
        where: { userId: session.user.id },
        data: {
          balance: {
            decrement: validatedData.totalAmount,
          },
        },
      });

      // Create wallet transaction
      await prisma.walletTransaction.create({
        data: {
          walletId: session.user.id,
          type: 'purchase',
          amount: validatedData.totalAmount,
          description: `Order #${order.id}`,
          status: 'completed',
        },
      });
    }

    // Update product stock
    for (const item of validatedData.items) {
      await prisma.product.update({
        where: { id: item.productId },
        data: {
          stock: {
            decrement: item.quantity,
          },
        },
      });
    }

    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.errors },
        { status: 400 }
      );
    }

    console.error('Order creation error:', error);
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { id, status } = body;

    // Check if order exists and belongs to user
    const existingOrder = await prisma.order.findFirst({
      where: {
        id,
        userId: session.user.id,
      },
    });

    if (!existingOrder) {
      return NextResponse.json({ error: 'Order not found or unauthorized' }, { status: 404 });
    }

    // Update order status
    const order = await prisma.order.update({
      where: { id },
      data: { status },
      include: {
        items: {
          include: {
            product: {
              select: {
                id: true,
                name: true,
                image: true,
                shop: {
                  select: {
                    id: true,
                    name: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    return NextResponse.json(order);
  } catch (error) {
    console.error('Order update error:', error);
    return NextResponse.json({ error: 'Failed to update order' }, { status: 500 });
  }
}

// AI Guidance: This API route handles order management.
// In a real app, it would interact with a database and include proper error handling.
