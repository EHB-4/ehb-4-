import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import { checkModuleEligibility } from '@/lib/utils/walletEligibility';
import { prisma } from '@/lib/prisma';

// Mock database
let products = [
  {
    id: 1,
    name: 'Product 1',
    description: 'Description 1',
    price: 99.99,
    image: 'https://via.placeholder.com/300',
  },
  {
    id: 2,
    name: 'Product 2',
    description: 'Description 2',
    price: 149.99,
    image: 'https://via.placeholder.com/300',
  },
];

export async function GET() {
  return NextResponse.json(products);
}

export async function POST(request: Request) {
  const data = await request.json();
  const newProduct = {
    id: products.length + 1,
    ...data,
  };
  products.push(newProduct);
  return NextResponse.json(newProduct);
}

export async function PUT(request: Request) {
  const { id, ...updates } = await request.json();
  const index = products.findIndex(product => product.id === id);
  
  if (index === -1) {
    return NextResponse.json({ error: 'Product not found' }, { status: 404 });
  }

  products[index] = { ...products[index], ...updates };
  return NextResponse.json(products[index]);
}

export async function DELETE(request: Request) {
  const { id } = await request.json();
  products = products.filter(product => product.id !== id);
  return NextResponse.json({ success: true });
}

// AI Guidance: This API route handles product management.
// In a real app, it would interact with a database and include proper error handling.
