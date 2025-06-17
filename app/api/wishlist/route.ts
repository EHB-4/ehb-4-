import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const wishlistItemSchema = z.object({
  productId: z.string(),
  notes: z.string().optional(),
});

// In a real app, use a database
let wishlistItems = [
  {
    id: 1,
    name: 'Premium Headphones',
    price: 199.99,
    image: 'https://via.placeholder.com/150',
  },
  {
    id: 2,
    name: 'Wireless Mouse',
    price: 49.99,
    image: 'https://via.placeholder.com/150',
  },
];

export async function GET() {
  return NextResponse.json(wishlistItems);
}

export async function POST(request: Request) {
  const item = await request.json();
  const newItem = { ...item, id: wishlistItems.length + 1 };
  wishlistItems.push(newItem);
  return NextResponse.json(newItem);
}

export async function DELETE(request: Request) {
  const { id } = await request.json();
  wishlistItems = wishlistItems.filter(item => item.id !== id);
  return NextResponse.json({ success: true });
}

// AI Guidance: This API route handles wishlist operations.
// In a real app, it would interact with a database and include proper error handling.

export async function GET_prisma(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const wishlist = await prisma.wishlist.findUnique({
      where: {
        userId: session.user.id,
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!wishlist) {
      return NextResponse.json({ items: [] });
    }

    return NextResponse.json(wishlist.items);
  } catch (error) {
    console.error('Wishlist fetch error:', error);
    return NextResponse.json({ error: 'Failed to fetch wishlist' }, { status: 500 });
  }
}

export async function POST_prisma(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const validationResult = wishlistItemSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: validationResult.error.format() },
        { status: 400 }
      );
    }

    // Get or create wishlist
    let wishlist = await prisma.wishlist.findUnique({
      where: {
        userId: session.user.id,
      },
    });

    if (!wishlist) {
      wishlist = await prisma.wishlist.create({
        data: {
          userId: session.user.id,
        },
      });
    }

    // Check if product exists
    const product = await prisma.product.findUnique({
      where: {
        id: validationResult.data.productId,
      },
    });

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    // Check if item already in wishlist
    const existingItem = await prisma.wishlistItem.findFirst({
      where: {
        wishlistId: wishlist.id,
        productId: validationResult.data.productId,
      },
    });

    if (existingItem) {
      return NextResponse.json({ error: 'Product already in wishlist' }, { status: 400 });
    }

    const newItem = await prisma.wishlistItem.create({
      data: {
        wishlistId: wishlist.id,
        productId: validationResult.data.productId,
        notes: validationResult.data.notes,
      },
      include: {
        product: true,
      },
    });

    return NextResponse.json(newItem);
  } catch (error) {
    console.error('Wishlist update error:', error);
    return NextResponse.json({ error: 'Failed to update wishlist' }, { status: 500 });
  }
}

export async function DELETE_prisma(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const itemId = searchParams.get('itemId');

    if (!itemId) {
      return NextResponse.json({ error: 'Missing item ID' }, { status: 400 });
    }

    const wishlist = await prisma.wishlist.findUnique({
      where: {
        userId: session.user.id,
      },
    });

    if (!wishlist) {
      return NextResponse.json({ error: 'Wishlist not found' }, { status: 404 });
    }

    await prisma.wishlistItem.delete({
      where: {
        id: itemId,
        wishlistId: wishlist.id,
      },
    });

    return NextResponse.json({ message: 'Item removed from wishlist' });
  } catch (error) {
    console.error('Wishlist item deletion error:', error);
    return NextResponse.json({ error: 'Failed to remove item from wishlist' }, { status: 500 });
  }
} 