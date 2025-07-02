export const runtime = "nodejs";
import { NextRequest, NextResponse } from 'next/server';

import {
  initPolkadotAPI,
  getBalance,
  getStakingInfo,
  getValidatorInfo,
} from '@/lib/polkadot/config';

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const address = searchParams.get('address');
    const action = searchParams.get('action');

    if (!address) {
      return NextResponse.json({ error: 'Address is required' }, { status: 400 });
    }

    switch (action) {
      case 'balance':
        const balance = await getBalance(address);
        return NextResponse.json({ balance: balance.toString() });

      case 'staking':
        const stakingInfo = await getStakingInfo(address);
        return NextResponse.json({ stakingInfo });

      case 'validator':
        const validatorInfo = await getValidatorInfo(address);
        return NextResponse.json({ validatorInfo });

      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }
  } catch (error) {
    console.error('Polkadot API Error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
