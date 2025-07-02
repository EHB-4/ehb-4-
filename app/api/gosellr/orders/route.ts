import { NextRequest, NextResponse } from 'next/server';
import { GoSellrOrder, OrderStatus, PaymentMethod, PaymentStatus } from '@/types/gosellr';

// ========================================
// GOSELLR ORDERS API ROUTE
// ========================================

// Mock data for development
const mockOrders: GoSellrOrder[] = [
  {
    id: 'order-001',
    userId: 'user-123',
    sellerId: 'seller-1',
    items: [
      {
        productId: 'prod-1',
        productName: 'Premium Wireless Headphones',
        quantity: 1,
        price: 299.99,
        total: 299.99,
        sellerId: 'seller-1',
      },
    ],
    subtotal: 299.99,
    tax: 29.99,
    shipping: 0,
    total: 329.98,
    status: 'pending',
    paymentMethod: 'escrow',
    paymentStatus: 'pending',
    shippingAddress: {
      street: '123 Main St',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'USA',
    },
    billingAddress: {
      street: '123 Main St',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'USA',
    },
    blockchainTransaction: {
      hash: '0x1234...5678',
      blockNumber: 12345678,
      gasUsed: 21000,
      gasPrice: 20000000000,
      status: 'confirmed',
      confirmations: 12,
      timestamp: new Date('2024-01-15T10:30:00'),
    },
    createdAt: new Date('2024-01-15T10:30:00'),
    updatedAt: new Date('2024-01-15T10:30:00'),
  },
  {
    id: 'order-002',
    userId: 'user-456',
    sellerId: 'seller-2',
    items: [
      {
        productId: 'prod-2',
        productName: 'Smart Fitness Watch',
        quantity: 1,
        price: 199.99,
        total: 199.99,
        sellerId: 'seller-2',
      },
    ],
    subtotal: 199.99,
    tax: 19.99,
    shipping: 9.99,
    total: 229.97,
    status: 'completed',
    paymentMethod: 'crypto',
    paymentStatus: 'completed',
    trackingNumber: 'TRK123456789',
    estimatedDelivery: new Date('2024-01-20'),
    shippingAddress: {
      street: '456 Oak Ave',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94102',
      country: 'USA',
    },
    billingAddress: {
      street: '456 Oak Ave',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94102',
      country: 'USA',
    },
    blockchainTransaction: {
      hash: '0x8765...4321',
      blockNumber: 12345679,
      gasUsed: 21000,
      gasPrice: 20000000000,
      status: 'confirmed',
      confirmations: 45,
      timestamp: new Date('2024-01-14T15:45:00'),
    },
    createdAt: new Date('2024-01-14T15:45:00'),
    updatedAt: new Date('2024-01-16T09:15:00'),
  },
];

// ========================================
// GET - Fetch Orders
// ========================================

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // Extract query parameters
    const userId = searchParams.get('userId');
    const sellerId = searchParams.get('sellerId');
    const status = searchParams.get('status') as OrderStatus;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');

    // Filter orders based on parameters
    let filteredOrders = [...mockOrders];

    if (userId) {
      filteredOrders = filteredOrders.filter(o => o.userId === userId);
    }

    if (sellerId) {
      filteredOrders = filteredOrders.filter(o => o.sellerId === sellerId);
    }

    if (status) {
      filteredOrders = filteredOrders.filter(o => o.status === status);
    }

    // Sort by creation date (newest first)
    filteredOrders.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    // Pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedOrders = filteredOrders.slice(startIndex, endIndex);

    return NextResponse.json({
      success: true,
      data: {
        orders: paginatedOrders,
        total: filteredOrders.length,
        page,
        limit,
        totalPages: Math.ceil(filteredOrders.length / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch orders' }, { status: 500 });
  }
}

// ========================================
// POST - Create Order
// ========================================

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    const requiredFields = [
      'userId',
      'items',
      'shippingAddress',
      'billingAddress',
      'paymentMethod',
    ];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { success: false, error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Calculate totals
    const subtotal = body.items.reduce(
      (sum: number, item: any) => sum + item.price * item.quantity,
      0
    );
    const tax = subtotal * 0.1; // 10% tax
    const shipping = body.shipping || 0;
    const total = subtotal + tax + shipping;

    // Create new order
    const newOrder: GoSellrOrder = {
      id: `order-${Date.now()}`,
      userId: body.userId,
      sellerId: body.sellerId,
      items: body.items,
      subtotal,
      tax,
      shipping,
      total,
      status: 'pending',
      paymentMethod: body.paymentMethod,
      paymentStatus: 'pending',
      shippingAddress: body.shippingAddress,
      billingAddress: body.billingAddress,
      blockchainTransaction: {
        hash: '',
        blockNumber: 0,
        gasUsed: 0,
        gasPrice: 0,
        status: 'pending',
        confirmations: 0,
        timestamp: new Date(),
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // In a real application, save to database
    mockOrders.push(newOrder);

    return NextResponse.json(
      {
        success: true,
        data: newOrder,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json({ success: false, error: 'Failed to create order' }, { status: 500 });
  }
}

// ========================================
// PUT - Update Order Status
// ========================================

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { orderId, status } = body;

    if (!orderId || !status) {
      return NextResponse.json(
        { success: false, error: 'Missing orderId or status' },
        { status: 400 }
      );
    }

    const orderIndex = mockOrders.findIndex(o => o.id === orderId);
    if (orderIndex === -1) {
      return NextResponse.json({ success: false, error: 'Order not found' }, { status: 404 });
    }

    // Update order status
    mockOrders[orderIndex].status = status as OrderStatus;
    mockOrders[orderIndex].updatedAt = new Date();

    return NextResponse.json({
      success: true,
      data: mockOrders[orderIndex],
    });
  } catch (error) {
    console.error('Error updating order:', error);
    return NextResponse.json({ success: false, error: 'Failed to update order' }, { status: 500 });
  }
}
