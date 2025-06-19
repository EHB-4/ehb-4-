import { NextResponse } from 'next/server';

// In a real app, use a database
const adminData = {
  totalOrders: 100,
  totalRevenue: 10000,
  totalProducts: 50,
  totalCustomers: 200,
  recentOrders: [
    {
      id: 1,
      customer: 'John Doe',
      total: 199.99,
      status: 'Delivered',
    },
    {
      id: 2,
      customer: 'Jane Smith',
      total: 299.99,
      status: 'Processing',
    },
    {
      id: 3,
      customer: 'Bob Johnson',
      total: 149.99,
      status: 'Shipped',
    },
  ],
};

export async function GET() {
  return NextResponse.json(adminData);
}

export async function POST(request: Request) {
  const { action, data } = await request.json();

  switch (action) {
    case 'updateOrderStatus':
      // In a real app, update order status in database
      return NextResponse.json({ success: true });
    case 'updateProduct':
      // In a real app, update product in database
      return NextResponse.json({ success: true });
    default:
      return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  }
}

// AI Guidance: This API route handles admin operations.
// In a real app, it would interact with a database and include proper error handling.
