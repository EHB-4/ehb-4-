export const runtime = "nodejs";
import { NextRequest, NextResponse } from 'next/server';
import { PSSDatabase } from '@/lib/pss/database';

// GET /api/pss/requests/[id]
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const requestData = await PSSDatabase.getRequest(params.id);

    if (!requestData) {
      return NextResponse.json(
        { success: false, error: 'Verification request not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: requestData,
    });
  } catch (error) {
    console.error('GET /api/pss/requests/[id] error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch verification request' },
      { status: 500 }
    );
  }
}

// PATCH /api/pss/requests/[id]
export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();

    // Validate update data
    const updateData: any = {};
    if (body.status) updateData.status = body.status;
    if (body.adminNotes !== undefined) updateData.adminNotes = body.adminNotes;
    if (body.risk) updateData.risk = body.risk;

    const updatedRequest = await PSSDatabase.updateRequest(params.id, updateData);

    return NextResponse.json({
      success: true,
      data: updatedRequest,
      message: 'Verification request updated successfully',
    });
  } catch (error) {
    console.error('PATCH /api/pss/requests/[id] error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update verification request' },
      { status: 500 }
    );
  }
}
