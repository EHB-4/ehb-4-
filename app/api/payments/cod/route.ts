export const runtime = 'nodejs';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { amount, currency, payment_method } = body;

    // AI Guidance: In a real app, you would handle COD logic here (e.g., order confirmation, delivery details).
    // For now, we just return a placeholder success response.
    return NextResponse.json({
      success: true,
      message: 'Cash on Delivery order confirmed successfully',
      data: {
        amount,
        currency,
        payment_method,
        order_id: 'cod_' + Math.random().toString(36).substring(2, 15),
      },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'COD order failed', error: (error as Error).message },
      { status: 400 }
    );
  }
}
