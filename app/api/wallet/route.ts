import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

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

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const wallet = await prisma.wallet.findUnique({
      where: { userId: session.user.id },
      include: {
        transactions: {
          orderBy: { createdAt: 'desc' },
          take: 10,
        },
      },
    });

    if (!wallet) {
      return NextResponse.json({ error: 'Wallet not found' }, { status: 404 });
    }

    return NextResponse.json(wallet);
  } catch (error) {
    console.error('Wallet fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch wallet' },
      { status: 500 }
    );
  }
}

export async function POST() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check if wallet already exists
    const existingWallet = await prisma.wallet.findUnique({
      where: { userId: session.user.id },
    });

    if (existingWallet) {
      return NextResponse.json(
        { error: 'Wallet already exists' },
        { status: 400 }
      );
    }

    // Create new wallet
    const wallet = await prisma.wallet.create({
      data: {
        userId: session.user.id,
        balance: 0,
        lockedBalance: 0,
        loyaltyType: 'BRONZE',
        loyaltyBonus: 0.05,
      },
    });

    return NextResponse.json(
      { message: 'Wallet created successfully', wallet },
      { status: 201 }
    );
  } catch (error) {
    console.error('Wallet creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create wallet' },
      { status: 500 }
    );
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
