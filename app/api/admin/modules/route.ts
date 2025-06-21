import { NextRequest, NextResponse } from 'next/server';

// Mock modules data
const modules = [
  {
    id: '1',
    name: 'PSS (Professional Security Services)',
    status: 'active',
    users: 2341,
    performance: 98,
    lastUpdated: '2024-01-15 14:30',
    version: '2.1.0',
    description: 'Professional security services and verification system',
    category: 'Security',
    endpoints: 15,
    database: 'PostgreSQL',
  },
  {
    id: '2',
    name: 'EMO (E-commerce Management)',
    status: 'active',
    users: 1892,
    performance: 95,
    lastUpdated: '2024-01-15 14:25',
    version: '1.8.2',
    description: 'E-commerce management and operations platform',
    category: 'E-commerce',
    endpoints: 23,
    database: 'MongoDB',
  },
  {
    id: '3',
    name: 'EDR (Education & Development)',
    status: 'active',
    users: 3456,
    performance: 92,
    lastUpdated: '2024-01-15 14:20',
    version: '3.0.1',
    description: 'Education and development resource management',
    category: 'Education',
    endpoints: 18,
    database: 'MySQL',
  },
  {
    id: '4',
    name: 'GoSellr (E-commerce Platform)',
    status: 'active',
    users: 2789,
    performance: 89,
    lastUpdated: '2024-01-15 14:15',
    version: '2.3.0',
    description: 'Multi-vendor e-commerce platform',
    category: 'E-commerce',
    endpoints: 31,
    database: 'PostgreSQL',
  },
  {
    id: '5',
    name: 'Wallet System',
    status: 'active',
    users: 1234,
    performance: 97,
    lastUpdated: '2024-01-15 14:10',
    version: '1.5.2',
    description: 'Digital wallet and payment processing system',
    category: 'Finance',
    endpoints: 12,
    database: 'Redis + PostgreSQL',
  },
  {
    id: '6',
    name: 'AI Marketplace',
    status: 'maintenance',
    users: 567,
    performance: 75,
    lastUpdated: '2024-01-15 14:05',
    version: '1.2.1',
    description: 'AI services marketplace and integration platform',
    category: 'AI/ML',
    endpoints: 8,
    database: 'MongoDB',
  },
  {
    id: '7',
    name: 'Franchise Management',
    status: 'active',
    users: 890,
    performance: 91,
    lastUpdated: '2024-01-15 14:00',
    version: '1.7.0',
    description: 'Franchise management and development system',
    category: 'Business',
    endpoints: 14,
    database: 'MySQL',
  },
  {
    id: '8',
    name: 'Token System',
    status: 'active',
    users: 2156,
    performance: 94,
    lastUpdated: '2024-01-15 13:55',
    version: '2.0.3',
    description: 'Cryptocurrency and token management system',
    category: 'Blockchain',
    endpoints: 20,
    database: 'PostgreSQL',
  },
];

// GET /api/admin/modules
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');

    let filteredModules = modules;

    // Filter by status
    if (status && status !== 'all') {
      filteredModules = filteredModules.filter(module => module.status === status);
    }

    // Filter by category
    if (category && category !== 'all') {
      filteredModules = filteredModules.filter(module => module.category === category);
    }

    // Filter by search
    if (search) {
      filteredModules = filteredModules.filter(
        module =>
          module.name.toLowerCase().includes(search.toLowerCase()) ||
          module.description.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedModules = filteredModules.slice(startIndex, endIndex);

    // Calculate stats
    const stats = {
      total: modules.length,
      active: modules.filter(m => m.status === 'active').length,
      inactive: modules.filter(m => m.status === 'inactive').length,
      maintenance: modules.filter(m => m.status === 'maintenance').length,
      error: modules.filter(m => m.status === 'error').length,
      totalUsers: modules.reduce((sum, module) => sum + module.users, 0),
      averagePerformance: Math.round(
        modules.reduce((sum, module) => sum + module.performance, 0) / modules.length
      ),
    };

    return NextResponse.json({
      success: true,
      data: paginatedModules,
      pagination: {
        page,
        limit,
        total: filteredModules.length,
        pages: Math.ceil(filteredModules.length / limit),
      },
      stats,
    });
  } catch (error) {
    console.error('GET /api/admin/modules error:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch modules' }, { status: 500 });
  }
}

// PATCH /api/admin/modules
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { moduleId, action, ...updateData } = body;

    const moduleIndex = modules.findIndex(m => m.id === moduleId);
    if (moduleIndex === -1) {
      return NextResponse.json({ success: false, error: 'Module not found' }, { status: 404 });
    }

    // Handle different actions
    switch (action) {
      case 'activate':
        modules[moduleIndex].status = 'active';
        break;
      case 'deactivate':
        modules[moduleIndex].status = 'inactive';
        break;
      case 'maintenance':
        modules[moduleIndex].status = 'maintenance';
        break;
      case 'update':
        modules[moduleIndex] = { ...modules[moduleIndex], ...updateData };
        break;
      default:
        return NextResponse.json({ success: false, error: 'Invalid action' }, { status: 400 });
    }

    modules[moduleIndex].lastUpdated = new Date().toISOString().replace('T', ' ').substring(0, 19);

    return NextResponse.json({
      success: true,
      data: modules[moduleIndex],
      message: `Module ${action} successful`,
    });
  } catch (error) {
    console.error('PATCH /api/admin/modules error:', error);
    return NextResponse.json({ success: false, error: 'Failed to update module' }, { status: 500 });
  }
}
