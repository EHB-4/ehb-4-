import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';
import axios from 'axios';

// Validation schemas
const shopifyRequestSchema = z.object({
  action: z.enum([
    'create_shop',
    'get_products',
    'create_product',
    'update_product',
    'delete_product',
    'get_orders',
    'get_customers',
  ]),
  shopId: z.string().optional(),
  productId: z.string().optional(),
  data: z.record(z.any()).optional(),
});

const shopifyResponseSchema = z.object({
  success: z.boolean(),
  data: z.any(),
  error: z.string().optional(),
});

// Shopify API configuration
const shopifyConfig = {
  apiKey: process.env.SHOPIFY_API_KEY,
  apiSecret: process.env.SHOPIFY_API_SECRET,
  apiVersion: '2024-01', // Update this to the latest version
  baseUrl: process.env.SHOPIFY_API_URL,
};

// Initialize Shopify API client
const shopifyClient = axios.create({
  baseURL: shopifyConfig.baseUrl,
  headers: {
    'X-Shopify-Access-Token': shopifyConfig.apiKey,
    'Content-Type': 'application/json',
  },
});

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const validatedData = shopifyRequestSchema.parse(body);
    const { action, shopId, productId, data } = validatedData;

    // Check user's Shopify shop
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: { shopifyShop: true },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Log Shopify request
    const shopifyRequest = await prisma.shopifyRequest.create({
      data: {
        userId: session.user.id,
        action,
        shopId,
        productId,
        data,
        status: 'processing',
      },
    });

    try {
      let response;

      switch (action) {
        case 'create_shop':
          if (user.shopifyShop) {
            throw new Error('Shopify shop already exists');
          }
          response = await shopifyClient.post('/admin/api/2024-01/shops.json', {
            shop: {
              name: data?.name,
              email: user.email,
              domain: data?.domain,
              plan_name: 'basic',
            },
          });
          break;

        case 'get_products':
          if (!user.shopifyShop) {
            throw new Error('Shopify shop not found');
          }
          response = await shopifyClient.get(
            `/admin/api/2024-01/shops/${user.shopifyShop.shopId}/products.json`
          );
          break;

        case 'create_product':
          if (!user.shopifyShop) {
            throw new Error('Shopify shop not found');
          }
          response = await shopifyClient.post(
            `/admin/api/2024-01/shops/${user.shopifyShop.shopId}/products.json`,
            {
              product: data,
            }
          );
          break;

        case 'update_product':
          if (!user.shopifyShop || !productId) {
            throw new Error('Shopify shop or product not found');
          }
          response = await shopifyClient.put(
            `/admin/api/2024-01/shops/${user.shopifyShop.shopId}/products/${productId}.json`,
            {
              product: data,
            }
          );
          break;

        case 'delete_product':
          if (!user.shopifyShop || !productId) {
            throw new Error('Shopify shop or product not found');
          }
          response = await shopifyClient.delete(
            `/admin/api/2024-01/shops/${user.shopifyShop.shopId}/products/${productId}.json`
          );
          break;

        case 'get_orders':
          if (!user.shopifyShop) {
            throw new Error('Shopify shop not found');
          }
          response = await shopifyClient.get(
            `/admin/api/2024-01/shops/${user.shopifyShop.shopId}/orders.json`
          );
          break;

        case 'get_customers':
          if (!user.shopifyShop) {
            throw new Error('Shopify shop not found');
          }
          response = await shopifyClient.get(
            `/admin/api/2024-01/shops/${user.shopifyShop.shopId}/customers.json`
          );
          break;

        default:
          throw new Error('Invalid action');
      }

      // Update request status
      await prisma.shopifyRequest.update({
        where: { id: shopifyRequest.id },
        data: {
          status: 'completed',
          response: response.data,
        },
      });

      // Create or update Shopify shop if needed
      if (action === 'create_shop' && response.data.shop) {
        await prisma.shopifyShop.upsert({
          where: { userId: session.user.id },
          create: {
            userId: session.user.id,
            shopId: response.data.shop.id,
            name: response.data.shop.name,
            domain: response.data.shop.domain,
            status: 'active',
          },
          update: {
            shopId: response.data.shop.id,
            name: response.data.shop.name,
            domain: response.data.shop.domain,
            status: 'active',
          },
        });
      }

      const validatedResponse = shopifyResponseSchema.parse({
        success: true,
        data: response.data,
      });

      return NextResponse.json(validatedResponse);
    } catch (error) {
      // Update request status on error
      await prisma.shopifyRequest.update({
        where: { id: shopifyRequest.id },
        data: {
          status: 'failed',
          error: error instanceof Error ? error.message : 'Unknown error',
        },
      });

      throw error;
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input data', details: error.errors },
        { status: 400 }
      );
    }
    console.error('Shopify request error:', error);
    return NextResponse.json(
      { error: 'Failed to process Shopify request' },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const action = searchParams.get('action');
    const limit = parseInt(searchParams.get('limit') || '10');
    const offset = parseInt(searchParams.get('offset') || '0');

    const requests = await prisma.shopifyRequest.findMany({
      where: {
        userId: session.user.id,
        ...(action && { action }),
      },
      orderBy: { createdAt: 'desc' },
      take: limit,
      skip: offset,
    });

    // Get Shopify shop
    const shopifyShop = await prisma.shopifyShop.findUnique({
      where: { userId: session.user.id },
    });

    return NextResponse.json({
      success: true,
      data: {
        requests,
        shop: shopifyShop,
      },
      pagination: {
        limit,
        offset,
        total: await prisma.shopifyRequest.count({
          where: {
            userId: session.user.id,
            ...(action && { action }),
          },
        }),
      },
    });
  } catch (error) {
    console.error('Shopify requests fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch Shopify requests' },
      { status: 500 }
    );
  }
} 