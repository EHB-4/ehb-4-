import { NextResponse } from 'next/server';

// Mock orders data
const mockOrders = [
  {
    _id: 'order1',
    userId: 'user123',
    items: [
      {
        productId: 'prod1',
        name: 'Premium Course Package',
        price: 299,
        quantity: 1,
      },
    ],
    total: 299,
    status: 'completed',
    createdAt: '2024-01-15',
    paymentMethod: 'credit_card',
  },
  {
    _id: 'order2',
    userId: 'user123',
    items: [
      {
        productId: 'prod2',
        name: 'Consultation Session',
        price: 150,
        quantity: 1,
      },
    ],
    total: 150,
    status: 'pending',
    createdAt: '2024-01-20',
    paymentMethod: 'wallet',
  },
];

export async function GET(request: Request, { params }: { params: { orderId: string } }) {
  try {
    const order = mockOrders.find(o => o._id === params.orderId);

    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    return NextResponse.json({ order });
  } catch (error) {
    console.error('Error fetching order:', error);
    return NextResponse.json({ error: 'Failed to fetch order' }, { status: 500 });
  }
}

export async function PATCH(request: Request, { params }: { params: { orderId: string } }) {
  try {
    const body = await request.json();
    const { status } = body;

    const orderIndex = mockOrders.findIndex(o => o._id === params.orderId);

    if (orderIndex === -1) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    mockOrders[orderIndex].status = status;

    return NextResponse.json({ order: mockOrders[orderIndex] });
  } catch (error) {
    console.error('Error updating order:', error);
    return NextResponse.json({ error: 'Failed to update order' }, { status: 500 });
  }
}
