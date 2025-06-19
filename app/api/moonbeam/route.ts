import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { z } from 'zod';

import { authOptions } from '@/lib/auth';
import { MoonbeamToken } from '@/lib/moonbeam/tokens';

import {
  getTransaction,
  getBlock,
  getBalance,
  initMoonbeamProvider,
} from '../../../lib/moonbeam/config';

// Validation schemas
const moonbeamRequestSchema = z.object({
  action: z.enum(['get_balance', 'transfer', 'approve', 'get_allowance']),
  tokenAddress: z.string().optional(),
  recipient: z.string().optional(),
  amount: z.string().optional(),
  spender: z.string().optional(),
});

const moonbeamResponseSchema = z.object({
  success: z.boolean(),
  data: z.any(),
  error: z.string().optional(),
});

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const address = searchParams.get('address');
    const txHash = searchParams.get('txHash');
    const blockNumber = searchParams.get('blockNumber');

    if (!address && !txHash && !blockNumber) {
      return NextResponse.json(
        { error: 'Address, transaction hash, or block number is required' },
        { status: 400 }
      );
    }

    const provider = initMoonbeamProvider();
    let response;
    if (address) {
      response = await getBalance(provider, address);
    } else if (txHash) {
      response = await getTransaction(provider, txHash);
    } else if (blockNumber) {
      response = await getBlock(provider, parseInt(blockNumber));
    }

    return NextResponse.json({ success: true, data: response });
  } catch (error) {
    console.error('Moonbeam API Error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const validatedData = moonbeamRequestSchema.parse(body);

    let response;
    switch (validatedData.action) {
      case 'get_balance':
        if (!validatedData.tokenAddress) {
          return NextResponse.json({ error: 'Token address is required' }, { status: 400 });
        }
        const token = new MoonbeamToken(validatedData.tokenAddress);
        response = await token.balanceOf(session.user.id);
        break;

      case 'transfer':
        if (!validatedData.tokenAddress || !validatedData.recipient || !validatedData.amount) {
          return NextResponse.json(
            { error: 'Token address, recipient, and amount are required' },
            { status: 400 }
          );
        }
        const transferToken = new MoonbeamToken(validatedData.tokenAddress);
        response = await transferToken.transfer(
          validatedData.recipient,
          BigInt(validatedData.amount)
        );
        break;

      case 'approve':
        if (!validatedData.tokenAddress || !validatedData.spender || !validatedData.amount) {
          return NextResponse.json(
            { error: 'Token address, spender, and amount are required' },
            { status: 400 }
          );
        }
        const approveToken = new MoonbeamToken(validatedData.tokenAddress);
        response = await approveToken.approve(validatedData.spender, BigInt(validatedData.amount));
        break;

      case 'get_allowance':
        if (!validatedData.tokenAddress || !validatedData.spender) {
          return NextResponse.json(
            { error: 'Token address and spender are required' },
            { status: 400 }
          );
        }
        const allowanceToken = new MoonbeamToken(validatedData.tokenAddress);
        response = await allowanceToken.allowance(session.user.id, validatedData.spender);
        break;

      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }

    const validatedResponse = moonbeamResponseSchema.parse({
      success: true,
      data: response,
    });

    return NextResponse.json(validatedResponse);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input data', details: error.errors },
        { status: 400 }
      );
    }

    console.error('Moonbeam API Error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
