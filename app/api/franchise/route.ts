import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Mock database for franchise data
const franchises = [
  {
    id: 'FR001',
    name: 'Ahmed Khan',
    email: 'ahmed.khan@email.com',
    phone: '+92-300-1234567',
    category: 'health',
    status: 'pending',
    investment: 150000,
    location: 'Karachi, Pakistan',
    applicationDate: '2024-01-15',
    roi: 25,
    popularity: 85,
  },
  {
    id: 'FR002',
    name: 'Fatima Ali',
    email: 'fatima.ali@email.com',
    phone: '+92-301-2345678',
    category: 'education',
    status: 'approved',
    investment: 80000,
    location: 'Lahore, Pakistan',
    applicationDate: '2024-01-14',
    roi: 30,
    popularity: 90,
  },
  {
    id: 'FR003',
    name: 'Muhammad Hassan',
    email: 'm.hassan@email.com',
    phone: '+92-302-3456789',
    category: 'law',
    status: 'review',
    investment: 200000,
    location: 'Islamabad, Pakistan',
    applicationDate: '2024-01-13',
    roi: 35,
    popularity: 75,
  },
  {
    id: 'FR004',
    name: 'Ayesha Malik',
    email: 'ayesha.malik@email.com',
    phone: '+92-303-4567890',
    category: 'health',
    status: 'rejected',
    investment: 120000,
    location: 'Faisalabad, Pakistan',
    applicationDate: '2024-01-12',
    roi: 20,
    popularity: 60,
  },
  {
    id: 'FR005',
    name: 'Ali Raza',
    email: 'ali.raza@email.com',
    phone: '+92-304-5678901',
    category: 'travel',
    status: 'pending',
    investment: 45000,
    location: 'Peshawar, Pakistan',
    applicationDate: '2024-01-11',
    roi: 28,
    popularity: 80,
  },
];

// Helper function to calculate ROI based on category and investment
function calculateROI(category: string, investment: number): number {
  const baseROI = {
    health: 25,
    education: 30,
    law: 35,
    travel: 28,
    books: 22,
  };

  const categoryROI = baseROI[category as keyof typeof baseROI] || 25;
  const investmentMultiplier = investment > 100000 ? 1.2 : 1.0;

  return Math.round(categoryROI * investmentMultiplier);
}

// Helper function to calculate popularity based on various factors
function calculatePopularity(category: string, location: string, investment: number): number {
  const categoryPopularity = {
    health: 85,
    education: 90,
    law: 75,
    travel: 80,
    books: 70,
  };

  const locationBonus = location.includes('Karachi') || location.includes('Lahore') ? 10 : 5;
  const investmentBonus = investment > 100000 ? 5 : 0;

  const basePopularity = categoryPopularity[category as keyof typeof categoryPopularity] || 75;
  return Math.min(100, basePopularity + locationBonus + investmentBonus);
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const status = searchParams.get('status');
    const location = searchParams.get('location');
    const minInvestment = searchParams.get('minInvestment');
    const maxInvestment = searchParams.get('maxInvestment');

    let filteredFranchises = [...franchises];

    // Apply filters
    if (category) {
      filteredFranchises = filteredFranchises.filter(f => f.category === category);
    }

    if (status) {
      filteredFranchises = filteredFranchises.filter(f => f.status === status);
    }

    if (location) {
      filteredFranchises = filteredFranchises.filter(f =>
        f.location.toLowerCase().includes(location.toLowerCase())
      );
    }

    if (minInvestment) {
      filteredFranchises = filteredFranchises.filter(f => f.investment >= parseInt(minInvestment));
    }

    if (maxInvestment) {
      filteredFranchises = filteredFranchises.filter(f => f.investment <= parseInt(maxInvestment));
    }

    // Calculate statistics
    const stats = {
      total: filteredFranchises.length,
      byStatus: filteredFranchises.reduce(
        (acc, f) => {
          acc[f.status] = (acc[f.status] || 0) + 1;
          return acc;
        },
        {} as Record<string, number>
      ),
      byCategory: filteredFranchises.reduce(
        (acc, f) => {
          acc[f.category] = (acc[f.category] || 0) + 1;
          return acc;
        },
        {} as Record<string, number>
      ),
      totalInvestment: filteredFranchises.reduce((sum, f) => sum + f.investment, 0),
      averageInvestment:
        filteredFranchises.length > 0
          ? Math.round(
              filteredFranchises.reduce((sum, f) => sum + f.investment, 0) /
                filteredFranchises.length
            )
          : 0,
    };

    return NextResponse.json({
      success: true,
      data: filteredFranchises,
      stats,
      filters: {
        category,
        status,
        location,
        minInvestment,
        maxInvestment,
      },
    });
  } catch (error) {
    console.error('Error fetching franchises:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch franchises' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    const requiredFields = ['name', 'email', 'phone', 'category', 'investment', 'location'];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { success: false, error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Generate unique ID
    const newId = `FR${String(franchises.length + 1).padStart(3, '0')}`;

    // Calculate ROI and popularity
    const roi = calculateROI(body.category, body.investment);
    const popularity = calculatePopularity(body.category, body.location, body.investment);

    // Create new franchise application
    const newFranchise = {
      id: newId,
      name: body.name,
      email: body.email,
      phone: body.phone,
      category: body.category,
      status: 'pending',
      investment: parseInt(body.investment),
      location: body.location,
      applicationDate: new Date().toISOString().split('T')[0],
      roi,
      popularity,
      // Additional fields from form
      dateOfBirth: body.dateOfBirth,
      nationality: body.nationality,
      experienceLevel: body.experienceLevel,
      businessName: body.businessName,
      fundingSource: body.fundingSource,
      motivation: body.motivation,
      goals: body.goals,
      timeline: body.timeline,
    };

    // Add to franchises array
    franchises.push(newFranchise);

    // Return success response
    return NextResponse.json(
      {
        success: true,
        data: newFranchise,
        message: 'Franchise application submitted successfully',
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating franchise application:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create franchise application' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, status, ...updateData } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Franchise ID is required' },
        { status: 400 }
      );
    }

    const franchiseIndex = franchises.findIndex(f => f.id === id);
    if (franchiseIndex === -1) {
      return NextResponse.json({ success: false, error: 'Franchise not found' }, { status: 404 });
    }

    // Update franchise data
    franchises[franchiseIndex] = {
      ...franchises[franchiseIndex],
      ...updateData,
      status: status || franchises[franchiseIndex].status,
    };

    return NextResponse.json({
      success: true,
      data: franchises[franchiseIndex],
      message: 'Franchise updated successfully',
    });
  } catch (error) {
    console.error('Error updating franchise:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update franchise' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Franchise ID is required' },
        { status: 400 }
      );
    }

    const franchiseIndex = franchises.findIndex(f => f.id === id);
    if (franchiseIndex === -1) {
      return NextResponse.json({ success: false, error: 'Franchise not found' }, { status: 404 });
    }

    const deletedFranchise = franchises.splice(franchiseIndex, 1)[0];

    return NextResponse.json({
      success: true,
      data: deletedFranchise,
      message: 'Franchise deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting franchise:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete franchise' },
      { status: 500 }
    );
  }
}
