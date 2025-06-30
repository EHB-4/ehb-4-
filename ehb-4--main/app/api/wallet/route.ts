import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';
import { clientPromise } from '@/lib/mongodb';

// Validation schemas
const walletActionSchema = z.object({
  action: z.enum(['lock', 'unlock', 'updateLoyalty']),
  amount: z.number().positive().optional(),
  loyaltyType: z.enum(['BRONZE', 'SILVER', 'GOLD', 'PLATINUM']).optional(),
});

const transactionSchema = z.object({
  type: z.enum(['lock', 'unlock', 'deposit', 'withdraw', 'transfer']),
  amount: z.number().positive(),
  description: z.string(),
  status: z.enum(['pending', 'completed', 'failed']),
});

// Helper functions
const calculateLoyaltyBonus = (loyaltyType: string): number => {
  const bonuses = {
    BRONZE: 0.05,
    SILVER: 0.10,
    GOLD: 0.15,
    PLATINUM: 0.20,
  };
  return bonuses[loyaltyType as keyof typeof bonuses] || 0;
};

const validateTransaction = (
  type: string,
  amount: number,
  balance: number,
  lockedBalance: number
): boolean => {
  switch (type) {
    case 'lock':
      return balance >= amount;
    case 'unlock':
      return lockedBalance >= amount;
    default:
      return true;
  }
};

// GET: Get current wallet balance for user
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const client = await clientPromise;
    const db = client.db();
    const wallet = await db.collection('wallets').findOne({ userId: session.user.id });
    return NextResponse.json({ balance: wallet ? wallet.balance : 0 });
  } catch (error) {
    console.error('Error fetching wallet:', error);
    return NextResponse.json({ error: 'Failed to fetch wallet' }, { status: 500 });
  }
}

// POST: Pay with wallet (deduct balance, log transaction)
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const data = await req.json();
    const { userId, orderId, amount } = data;
    if (!userId || !orderId || !amount) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    if (userId !== session.user.id) {
      return NextResponse.json({ error: 'Not allowed to pay for another user' }, { status: 403 });
    }
    const client = await clientPromise;
    const db = client.db();
    const wallet = await db.collection('wallets').findOne({ userId });
    if (!wallet || wallet.balance < amount) {
      return NextResponse.json({ error: 'Insufficient funds' }, { status: 400 });
    }
    // Deduct balance
    await db.collection('wallets').updateOne(
      { userId },
      { $inc: { balance: -amount } }
    );
    // Log transaction
    const txn = {
      userId,
      orderId,
      amount: -amount,
      type: 'order',
      description: `Order payment #${orderId}`,
      status: 'completed',
      createdAt: new Date(),
    };
    const txnResult = await db.collection('wallet_transactions').insertOne(txn);
    return NextResponse.json({ success: true, txnId: txnResult.insertedId });
  } catch (error) {
    console.error('Error processing wallet payment:', error);
    return NextResponse.json({ error: 'Failed to process payment' }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const validatedData = walletActionSchema.parse(body);
    const { action, amount, loyaltyType } = validatedData;

    const wallet = await prisma.wallet.findUnique({
      where: { userId: session.user.id },
    });

    if (!wallet) {
      return NextResponse.json({ error: 'Wallet not found' }, { status: 404 });
    }

    let updateData: any = {};
    let transaction: any = null;

    switch (action) {
      case 'lock':
        if (!amount || !validateTransaction('lock', amount, wallet.balance, wallet.lockedBalance)) {
          return NextResponse.json(
            { error: 'Invalid amount or insufficient balance' },
            { status: 400 }
          );
        }
        updateData = {
          balance: wallet.balance - amount,
          lockedBalance: wallet.lockedBalance + amount,
        };
        transaction = {
          type: 'lock',
          amount,
          description: 'Locked coins',
          status: 'completed',
        };
        break;

      case 'unlock':
        if (!amount || !validateTransaction('unlock', amount, wallet.balance, wallet.lockedBalance)) {
          return NextResponse.json(
            { error: 'Invalid amount or insufficient locked balance' },
            { status: 400 }
          );
        }
        updateData = {
          balance: wallet.balance + amount,
          lockedBalance: wallet.lockedBalance - amount,
        };
        transaction = {
          type: 'unlock',
          amount,
          description: 'Unlocked coins',
          status: 'completed',
        };
        break;

      case 'updateLoyalty':
        if (!loyaltyType) {
          return NextResponse.json(
            { error: 'Loyalty type is required' },
            { status: 400 }
          );
        }
        const bonus = calculateLoyaltyBonus(loyaltyType);
        updateData = {
          loyaltyType,
          loyaltyBonus: bonus,
        };
        break;

      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }

    // Update wallet and create transaction if needed
    const updatedWallet = await prisma.wallet.update({
      where: { userId: session.user.id },
      data: {
        ...updateData,
        ...(transaction && {
          transactions: {
            create: transaction,
          },
        }),
      },
      include: {
        transactions: {
          orderBy: { createdAt: 'desc' },
          take: 1,
        },
      },
    });

    return NextResponse.json({
      message: 'Wallet updated successfully',
      wallet: updatedWallet,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input data', details: error.errors },
        { status: 400 }
      );
    }
    console.error('Wallet update error:', error);
    return NextResponse.json(
      { error: 'Failed to update wallet' },
      { status: 500 }
    );
  }
}
