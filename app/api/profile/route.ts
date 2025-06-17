import { NextResponse } from 'next/server';

// In a real app, use a database
let userProfile = {
  name: 'John Doe',
  email: 'john@example.com',
  phone: '+1 234 567 890',
  address: '123 Main St, City, Country',
  preferences: {
    newsletter: true,
    notifications: true,
  },
};

export async function GET() {
  return NextResponse.json(userProfile);
}

export async function PUT(request: Request) {
  const updates = await request.json();
  userProfile = { ...userProfile, ...updates };
  return NextResponse.json(userProfile);
}

export async function PATCH(request: Request) {
  const updates = await request.json();
  userProfile = { ...userProfile, ...updates };
  return NextResponse.json(userProfile);
}

// AI Guidance: This API route handles user profile operations.
// In a real app, it would interact with a database and include proper error handling. 