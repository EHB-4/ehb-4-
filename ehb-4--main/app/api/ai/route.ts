import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { clientPromise } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

// GET: Product recommendations for user
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const client = await clientPromise;
    const db = client.db();
    // Mock: Recommend top 5 trending products (by sales)
    const products = await db.collection('products')
      .find({ status: 'active' })
      .sort({ sales: -1 })
      .limit(5)
      .toArray();
    return NextResponse.json({ recommendations: products });
  } catch (error) {
    console.error('Error fetching recommendations:', error);
    return NextResponse.json({ error: 'Failed to fetch recommendations' }, { status: 500 });
  }
}

// POST: Smart pricing suggestion for product
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const data = await req.json();
    const { productId } = data;
    if (!productId) {
      return NextResponse.json({ error: 'Missing productId' }, { status: 400 });
    }
    const client = await clientPromise;
    const db = client.db();
    const product = await db.collection('products').findOne({ _id: new ObjectId(productId) });
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }
    // Mock: Suggest price as 95% of current price if sales < 10, else keep same
    let suggestedPrice = product.price;
    if ((product.sales || 0) < 10) {
      suggestedPrice = Math.round(product.price * 0.95 * 100) / 100;
    }
    return NextResponse.json({ suggestedPrice });
  } catch (error) {
    console.error('Error with smart pricing:', error);
    return NextResponse.json({ error: 'Failed to suggest price' }, { status: 500 });
  }
} 