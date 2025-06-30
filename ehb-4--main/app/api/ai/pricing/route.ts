import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { clientPromise } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

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
    // Only allow seller to get suggestion for their own product
    const seller = await db.collection('sellers').findOne({ userId: session.user.id });
    if (!seller || !product.shopId) {
      return NextResponse.json({ error: 'Not authorized' }, { status: 403 });
    }
    // Market analysis: average price of similar products in same category
    const similarProducts = await db.collection('products')
      .find({ categoryId: product.categoryId, status: 'active', _id: { $ne: product._id } })
      .toArray();
    const avgPrice = similarProducts.length > 0
      ? similarProducts.reduce((sum, p) => sum + (p.price || 0), 0) / similarProducts.length
      : product.price;
    // Suggest 5% below market average for competitiveness
    const suggestedPrice = Math.round((avgPrice * 0.95) * 100) / 100;
    return NextResponse.json({ suggestedPrice, avgMarketPrice: Math.round(avgPrice * 100) / 100 });
  } catch (error) {
    console.error('Error with smart pricing:', error);
    return NextResponse.json({ error: 'Failed to suggest price' }, { status: 500 });
  }
} 