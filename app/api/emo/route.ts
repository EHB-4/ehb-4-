export const runtime = 'nodejs';
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

// EMO API Route Handler
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');

    switch (action) {
      case 'dashboard':
        return await getEMODashboard(session.user.id);
      case 'profile':
        return await getEMOProfile(session.user.id);
      case 'analytics':
        return await getEMOAnalytics(session.user.id);
      default:
        return NextResponse.json({
          message: 'EMO API is running',
          availableActions: ['dashboard', 'profile', 'analytics'],
        });
    }
  } catch (error) {
    console.error('EMO API Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { action, data } = body;

    switch (action) {
      case 'register':
        return await registerEMOUser(data);
      case 'update-profile':
        return await updateEMOProfile(session.user.id, data);
      case 'create-product':
        return await createEMOProduct(session.user.id, data);
      case 'create-order':
        return await createEMOOrder(session.user.id, data);
      case 'file-complaint':
        return await fileEMOComplaint(session.user.id, data);
      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }
  } catch (error) {
    console.error('EMO API Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// EMO Dashboard Data
async function getEMODashboard(userId: string) {
  try {
    // Get user's EMO data
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        // Add related data as needed
      },
    });

    // Mock dashboard data for now
    const dashboardData = {
      user: {
        name: user?.name || 'EMO User',
        email: user?.email,
        sqlLevel: 'Basic',
        kycStatus: 'pending',
        subscription: 'Normal',
      },
      stats: {
        totalProducts: 0,
        totalOrders: 0,
        totalComplaints: 0,
        walletBalance: 0,
      },
      recentActivity: [],
      quickActions: [
        { id: 'add-product', title: 'Add Product', icon: '📦' },
        { id: 'view-orders', title: 'View Orders', icon: '📋' },
        { id: 'file-complaint', title: 'File Complaint', icon: '⚠️' },
        { id: 'wallet', title: 'Wallet', icon: '💰' },
      ],
    };

    return NextResponse.json({ success: true, data: dashboardData });
  } catch (error) {
    console.error('Dashboard Error:', error);
    return NextResponse.json({ error: 'Failed to load dashboard' }, { status: 500 });
  }
}

// EMO Profile Data
async function getEMOProfile(userId: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    const profileData = {
      user: {
        id: user?.id,
        name: user?.name,
        email: user?.email,
        role: user?.role || 'user',
      },
      emo: {
        sqlLevel: 'Basic',
        kycStatus: 'pending',
        subscription: 'Normal',
        joinDate: user?.createdAt || new Date(),
      },
    };

    return NextResponse.json({ success: true, data: profileData });
  } catch (error) {
    console.error('Profile Error:', error);
    return NextResponse.json({ error: 'Failed to load profile' }, { status: 500 });
  }
}

// EMO Analytics
async function getEMOAnalytics(userId: string) {
  try {
    const analyticsData = {
      sales: {
        total: 0,
        monthly: 0,
        weekly: 0,
      },
      orders: {
        total: 0,
        pending: 0,
        completed: 0,
      },
      complaints: {
        total: 0,
        resolved: 0,
        pending: 0,
      },
      performance: {
        rating: 0,
        satisfaction: 0,
      },
    };

    return NextResponse.json({ success: true, data: analyticsData });
  } catch (error) {
    console.error('Analytics Error:', error);
    return NextResponse.json({ error: 'Failed to load analytics' }, { status: 500 });
  }
}

// Register EMO User
async function registerEMOUser(data: any) {
  try {
    const { name, email, phone, password } = data;

    // Validate input
    if (!name || !email || !phone || !password) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json({ error: 'User already exists' }, { status: 400 });
    }

    // Create user (you'll need to add password hashing)
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: password,
        role: 'USER',
      },
    });

    return NextResponse.json({
      success: true,
      message: 'EMO user registered successfully',
      userId: user.id,
    });
  } catch (error) {
    console.error('Registration Error:', error);
    return NextResponse.json({ error: 'Failed to register user' }, { status: 500 });
  }
}

// Update EMO Profile
async function updateEMOProfile(userId: string, data: any) {
  try {
    const { name, phone, address } = data;

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        name: name || undefined,
        // Add other fields as needed
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Profile updated successfully',
      user: updatedUser,
    });
  } catch (error) {
    console.error('Profile Update Error:', error);
    return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 });
  }
}

// Create EMO Product
async function createEMOProduct(userId: string, data: any) {
  try {
    const { title, category, price, description, images } = data;

    if (!title || !category || !price) {
      return NextResponse.json(
        { error: 'Title, category, and price are required' },
        { status: 400 }
      );
    }

    // Mock product creation (you'll need to create a Product model)
    const product = {
      id: Date.now().toString(),
      title,
      category,
      price: parseFloat(price),
      description,
      images: images || [],
      sellerId: userId,
      status: 'draft',
      createdAt: new Date(),
    };

    return NextResponse.json({
      success: true,
      message: 'Product created successfully',
      product,
    });
  } catch (error) {
    console.error('Product Creation Error:', error);
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
  }
}

// Create EMO Order
async function createEMOOrder(userId: string, data: any) {
  try {
    const { productId, quantity, deliveryAddress } = data;

    if (!productId || !quantity || !deliveryAddress) {
      return NextResponse.json(
        { error: 'Product ID, quantity, and delivery address are required' },
        { status: 400 }
      );
    }

    // Mock order creation
    const order = {
      id: Date.now().toString(),
      productId,
      quantity: parseInt(quantity),
      deliveryAddress,
      buyerId: userId,
      status: 'order_placed',
      createdAt: new Date(),
      eta: '3 days',
    };

    return NextResponse.json({
      success: true,
      message: 'Order placed successfully',
      order,
    });
  } catch (error) {
    console.error('Order Creation Error:', error);
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
  }
}

// File EMO Complaint
async function fileEMOComplaint(userId: string, data: any) {
  try {
    const { orderId, type, description } = data;

    if (!orderId || !type || !description) {
      return NextResponse.json(
        { error: 'Order ID, type, and description are required' },
        { status: 400 }
      );
    }

    // Mock complaint creation
    const complaint = {
      id: Date.now().toString(),
      orderId,
      type,
      description,
      userId,
      status: 'filed',
      caseNo: `CMP-${Date.now()}`,
      createdAt: new Date(),
    };

    return NextResponse.json({
      success: true,
      message: 'Complaint filed successfully',
      complaint,
    });
  } catch (error) {
    console.error('Complaint Filing Error:', error);
    return NextResponse.json({ error: 'Failed to file complaint' }, { status: 500 });
  }
}
