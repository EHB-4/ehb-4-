import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

// Mock database for demonstration
const products = [
  {
    id: '1',
    name: 'Premium Wireless Headphones',
    category: 'Electronics',
    price: 199.99,
    stock: 15,
    status: 'active',
    sales: 45,
    description: 'High-quality wireless headphones with noise cancellation',
    sku: 'ELEC-001',
    weight: 0.5,
    dimensions: '20x15x8 cm',
  },
  {
    id: '2',
    name: 'Organic Cotton T-Shirt',
    category: 'Clothing',
    price: 29.99,
    stock: 3,
    status: 'active',
    sales: 128,
    description: 'Comfortable organic cotton t-shirt',
    sku: 'CLOTH-001',
    weight: 0.2,
    dimensions: '30x25x2 cm',
  },
  {
    id: '3',
    name: 'Smart Fitness Watch',
    category: 'Electronics',
    price: 299.99,
    stock: 0,
    status: 'out_of_stock',
    sales: 67,
    description: 'Advanced fitness tracking smartwatch',
    sku: 'ELEC-002',
    weight: 0.1,
    dimensions: '4x4x1 cm',
  },
];

// Validation schema
const ProductSchema = z.object({
  name: z.string().min(2, 'Product name must be at least 2 characters'),
  category: z.string().min(2, 'Category must be at least 2 characters'),
  price: z.number().min(0, 'Price must be non-negative'),
  stock: z.number().min(0, 'Stock must be non-negative'),
  description: z.string().optional(),
  sku: z.string().min(3, 'SKU must be at least 3 characters'),
  weight: z.number().min(0, 'Weight must be non-negative'),
  dimensions: z.string().optional(),
});

// EMO Products API Route Handler
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const status = searchParams.get('status');
    const category = searchParams.get('category');

    const skip = (page - 1) * limit;

    // Build where clause
    const where: any = {
      sellerId: session.user.id,
    };

    if (status) {
      where.emoStatus = status;
    }

    if (category) {
      where.category = category;
    }

    // Get products with pagination
    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        include: {
          reviews: {
            include: {
              user: {
                select: {
                  name: true,
                },
              },
            },
          },
          orders: {
            include: {
              order: {
                select: {
                  status: true,
                },
              },
            },
          },
        },
        skip,
        take: limit,
        orderBy: {
          createdAt: 'desc',
        },
      }),
      prisma.product.count({ where }),
    ]);

    // Calculate stats for each product
    const productsWithStats = products.map(product => {
      const totalOrders = product.orders.length;
      const completedOrders = product.orders.filter(
        item => item.order.status === 'COMPLETED'
      ).length;
      const averageRating =
        product.reviews.length > 0
          ? product.reviews.reduce((sum, review) => sum + review.rating, 0) / product.reviews.length
          : 0;

      return {
        ...product,
        stats: {
          totalOrders,
          completedOrders,
          averageRating,
          totalReviews: product.reviews.length,
        },
      };
    });

    return NextResponse.json({
      success: true,
      data: {
        products: productsWithStats,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
      },
    });
  } catch (error) {
    console.error('EMO Products API Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();

    // Validate input
    const productSchema = z.object({
      name: z.string().min(1, 'Product name is required'),
      description: z.string().min(1, 'Description is required'),
      price: z.number().positive('Price must be positive'),
      category: z.string().min(1, 'Category is required'),
      stock: z.number().int().min(0, 'Stock must be non-negative'),
      images: z.array(z.string()).optional(),
      commission: z.number().min(0).max(1).optional(),
    });

    const validatedData = productSchema.parse(body);

    // Create product
    const product = await prisma.product.create({
      data: {
        ...validatedData,
        sellerId: session.user.id,
        emoStatus: 'PENDING',
        commission: validatedData.commission || 0.05,
      },
    });

    return NextResponse.json({
      success: true,
      data: product,
      message: 'Product created successfully. Waiting for approval.',
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors[0].message }, { status: 400 });
    }
    console.error('EMO Products API Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { id, ...updateData } = body;

    if (!id) {
      return NextResponse.json({ error: 'Product ID is required' }, { status: 400 });
    }

    // Check if product belongs to user
    const existingProduct = await prisma.product.findFirst({
      where: {
        id,
        sellerId: session.user.id,
      },
    });

    if (!existingProduct) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    // Update product
    const product = await prisma.product.update({
      where: { id },
      data: {
        ...updateData,
        emoStatus: 'PENDING', // Reset status for re-approval
        approvedAt: null,
        approvedBy: null,
      },
    });

    return NextResponse.json({
      success: true,
      data: product,
      message: 'Product updated successfully. Waiting for re-approval.',
    });
  } catch (error) {
    console.error('EMO Products API Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Product ID is required' }, { status: 400 });
    }

    // Check if product belongs to user
    const existingProduct = await prisma.product.findFirst({
      where: {
        id,
        sellerId: session.user.id,
      },
    });

    if (!existingProduct) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    // Soft delete by setting isActive to false
    await prisma.product.update({
      where: { id },
      data: { isActive: false },
    });

    return NextResponse.json({
      success: true,
      message: 'Product deleted successfully',
    });
  } catch (error) {
    console.error('EMO Products API Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
