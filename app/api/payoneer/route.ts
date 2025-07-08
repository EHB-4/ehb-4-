export const runtime = 'nodejs';
import axios from 'axios';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { z } from 'zod';

import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// Validation schemas
const payoneerRequestSchema = z.object({
  action: z.enum(['create_account', 'get_balance', 'transfer', 'get_transactions']),
  amount: z.number().positive().optional(),
  currency: z.enum(['USD', 'EUR', 'GBP']).optional(),
  recipient_id: z.string().optional(),
  description: z.string().optional(),
});

const payoneerResponseSchema = z.object({
  success: z.boolean(),
  data: z.any(),
  error: z.string().optional(),
});

// Payoneer API configuration
const payoneerConfig = {
  apiKey: process.env.PAYONEER_API_KEY,
  partnerId: process.env.PAYONEER_PARTNER_ID,
  baseUrl: process.env.PAYONEER_API_URL,
};

// Initialize Payoneer API client
const payoneerClient = axios.create({
  baseURL: payoneerConfig.baseUrl,
  headers: {
    Authorization: `Bearer ${payoneerConfig.apiKey}`,
    'Content-Type': 'application/json',
  },
});

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const validatedData = payoneerRequestSchema.parse(body);

    let response;
    switch (validatedData.action) {
      case 'create_account':
        response = await payoneerClient.post('/accounts', {
          partnerId: payoneerConfig.partnerId,
          email: session.user.email,
          name: session.user.name,
        });
        break;

      case 'get_balance':
        response = await payoneerClient.get('/balance');
        break;

      case 'transfer':
        if (!validatedData.amount || !validatedData.currency || !validatedData.recipient_id) {
          return NextResponse.json(
            { error: 'Amount, currency, and recipient_id are required for transfers' },
            { status: 400 }
          );
        }
        response = await payoneerClient.post('/transfers', {
          amount: validatedData.amount,
          currency: validatedData.currency,
          recipient_id: validatedData.recipient_id,
          description: validatedData.description,
        });
        break;

      case 'get_transactions':
        response = await payoneerClient.get('/transactions');
        break;

      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }

    const validatedResponse = payoneerResponseSchema.parse({
      success: true,
      data: response.data,
    });

    return NextResponse.json(validatedResponse);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input data', details: error.errors },
        { status: 400 }
      );
    }

    console.error('Payoneer API Error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
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

    const requests = await prisma.payoneerRequest.findMany({
      where: {
        userId: session.user.id,
        ...(action && { action }),
      },
      orderBy: { createdAt: 'desc' },
      take: limit,
      skip: offset,
    });

    // Get Payoneer account
    const payoneerAccount = await prisma.payoneerAccount.findUnique({
      where: { userId: session.user.id },
    });

    return NextResponse.json({
      success: true,
      data: {
        requests,
        account: payoneerAccount,
      },
      pagination: {
        limit,
        offset,
        total: await prisma.payoneerRequest.count({
          where: {
            userId: session.user.id,
            ...(action && { action }),
          },
        }),
      },
    });
  } catch (error) {
    console.error('Payoneer requests fetch error:', error);
    return NextResponse.json({ error: 'Failed to fetch Payoneer requests' }, { status: 500 });
  }
}
