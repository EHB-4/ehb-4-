export const runtime = "nodejs";
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { PSSDatabase } from '@/lib/pss/database';

// Validation schema
const VerificationRequestSchema = z.object({
  role: z.enum(['patient', 'doctor', 'business', 'franchise']),
  personalInfo: z.object({
    fullName: z.string().min(2, 'Full name must be at least 2 characters'),
    contactNumber: z.string().min(10, 'Contact number must be at least 10 digits'),
    dateOfBirth: z.string(),
    address: z.string().min(10, 'Address must be at least 10 characters'),
  }),
  documents: z.object({
    idCard: z.string().optional(),
    license: z.string().optional(),
  }),
  liveness: z.object({
    selfie: z.string().optional(),
  }),
  payment: z.object({
    amount: z.number(),
    method: z.string(),
    transactionId: z.string().optional(),
  }),
});

// GET /api/pss/requests
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') || undefined;
    const role = searchParams.get('role') || undefined;
    const search = searchParams.get('search') || undefined;

    const result = await PSSDatabase.getRequests({ status, role, search });

    return NextResponse.json({
      success: true,
      ...result,
    });
  } catch (error) {
    console.error('GET /api/pss/requests error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch verification requests' },
      { status: 500 }
    );
  }
}

// POST /api/pss/requests
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate request data
    const validatedData = VerificationRequestSchema.parse(body);

    // Create new verification request
    const newRequest = await PSSDatabase.createRequest({
      applicant: validatedData.personalInfo.fullName,
      role: validatedData.role,
      submitted: new Date().toISOString().split('T')[0],
      fullName: validatedData.personalInfo.fullName,
      contactNumber: validatedData.personalInfo.contactNumber,
      dateOfBirth: validatedData.personalInfo.dateOfBirth,
      address: validatedData.personalInfo.address,
      amount: validatedData.payment.amount,
      method: validatedData.payment.method,
      idCard: validatedData.documents.idCard,
      license: validatedData.documents.license,
      selfie: validatedData.liveness.selfie,
      transactionId: validatedData.payment.transactionId,
    });

    return NextResponse.json(
      {
        success: true,
        data: newRequest,
        message: 'Verification request submitted successfully',
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('POST /api/pss/requests error:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: 'Validation failed', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, error: 'Failed to submit verification request' },
      { status: 500 }
    );
  }
}
