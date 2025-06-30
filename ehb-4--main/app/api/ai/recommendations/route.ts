import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { clientPromise } from '@/lib/mongodb';

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const client = await clientPromise;
    const db = client.db();
    // 1. Try to recommend based on user's order history
    const orders = await db.collection('orders').find({ userId: session.user.id }).toArray();
    let recommendedProducts = [];
    if (orders.length > 0) {
      // Get product/category frequency from order history
      const productIds = orders.flatMap(o => o.items.map(i => i._id));
      const productFreq = {};
      productIds.forEach(id => { productFreq[id] = (productFreq[id] || 0) + 1; });
      // Recommend top 5 most ordered products (or similar category)
      const topProductIds = Object.entries(productFreq)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([id]) => id);
      recommendedProducts = await db.collection('products')
        .find({ _id: { $in: topProductIds.map(id => typeof id === 'string' ? new db.bson.ObjectId(id) : id) }, status: 'active' })
        .toArray();
      // If less than 5, fill with trending in same categories
      if (recommendedProducts.length < 5) {
        const categories = recommendedProducts.map(p => p.categoryId);
        const trending = await db.collection('products')
          .find({ categoryId: { $in: categories }, status: 'active' })
          .sort({ sales: -1 })
          .limit(5 - recommendedProducts.length)
          .toArray();
        recommendedProducts = [...recommendedProducts, ...trending];
      }
    }
    // 2. If no order history, recommend trending products in user's area (if available)
    if (recommendedProducts.length === 0 && session.user.area) {
      recommendedProducts = await db.collection('products')
        .find({ area: session.user.area, status: 'active' })
        .sort({ sales: -1 })
        .limit(5)
        .toArray();
    }
    // 3. Fallback: trending products globally
    if (recommendedProducts.length === 0) {
      recommendedProducts = await db.collection('products')
        .find({ status: 'active' })
        .sort({ sales: -1 })
        .limit(5)
        .toArray();
    }
    return NextResponse.json({ recommendations: recommendedProducts });
  } catch (error) {
    console.error('Error fetching recommendations:', error);
    return NextResponse.json({ error: 'Failed to fetch recommendations' }, { status: 500 });
  }
} 