import { NextResponse } from 'next/server';

// In a real app, use a database
let inventory = [
  {
    id: 1,
    name: 'Premium Headphones',
    sku: 'PH-001',
    quantity: 50,
    price: 199.99,
    category: 'Electronics',
  },
  {
    id: 2,
    name: 'Wireless Mouse',
    sku: 'WM-001',
    quantity: 100,
    price: 49.99,
    category: 'Electronics',
  },
  {
    id: 3,
    name: 'Mechanical Keyboard',
    sku: 'KB-001',
    quantity: 75,
    price: 129.99,
    category: 'Electronics',
  },
];

export async function GET() {
  return NextResponse.json(inventory);
}

export async function POST(request: Request) {
  const product = await request.json();
  const newProduct = { ...product, id: inventory.length + 1 };
  inventory.push(newProduct);
  return NextResponse.json(newProduct);
}

export async function PUT(request: Request) {
  const { id, ...updates } = await request.json();
  const index = inventory.findIndex(item => item.id === id);
  
  if (index === -1) {
    return NextResponse.json({ error: 'Product not found' }, { status: 404 });
  }

  inventory[index] = { ...inventory[index], ...updates };
  return NextResponse.json(inventory[index]);
}

export async function DELETE(request: Request) {
  const { id } = await request.json();
  inventory = inventory.filter(item => item.id !== id);
  return NextResponse.json({ success: true });
}

// AI Guidance: This API route handles inventory management.
// In a real app, it would interact with a database and include proper error handling. 