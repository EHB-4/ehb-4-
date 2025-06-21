import { NextRequest, NextResponse } from 'next/server';

// Mock admin statistics data
const adminStats = {
  overview: {
    totalUsers: 15420,
    totalOrders: 8923,
    totalRevenue: 456789.12,
    activeModules: 8,
    pendingApprovals: 23,
    systemHealth: 'excellent',
    recentActivity: 156,
    securityAlerts: 2,
  },

  moduleStats: [
    {
      name: 'PSS (Professional Security Services)',
      status: 'active',
      users: 2341,
      performance: 98,
      lastUpdated: '2024-01-15 14:30',
      revenue: 89000,
    },
    {
      name: 'EMO (E-commerce Management)',
      status: 'active',
      users: 1892,
      performance: 95,
      lastUpdated: '2024-01-15 14:25',
      revenue: 125000,
    },
    {
      name: 'EDR (Education & Development)',
      status: 'active',
      users: 3456,
      performance: 92,
      lastUpdated: '2024-01-15 14:20',
      revenue: 67000,
    },
    {
      name: 'GoSellr (E-commerce Platform)',
      status: 'active',
      users: 2789,
      performance: 89,
      lastUpdated: '2024-01-15 14:15',
      revenue: 145000,
    },
    {
      name: 'Wallet System',
      status: 'active',
      users: 1234,
      performance: 97,
      lastUpdated: '2024-01-15 14:10',
      revenue: 32000,
    },
    {
      name: 'AI Marketplace',
      status: 'maintenance',
      users: 567,
      performance: 75,
      lastUpdated: '2024-01-15 14:05',
      revenue: 8900,
    },
    {
      name: 'Franchise Management',
      status: 'active',
      users: 890,
      performance: 91,
      lastUpdated: '2024-01-15 14:00',
      revenue: 45000,
    },
    {
      name: 'Token System',
      status: 'active',
      users: 2156,
      performance: 94,
      lastUpdated: '2024-01-15 13:55',
      revenue: 78000,
    },
  ],

  recentActivity: [
    {
      id: '1',
      type: 'user_registration',
      description: 'New user registered: john.doe@example.com',
      timestamp: '2024-01-15 14:35:22',
      severity: 'low',
    },
    {
      id: '2',
      type: 'order_placed',
      description: 'Large order placed: $2,450.00',
      timestamp: '2024-01-15 14:32:15',
      severity: 'medium',
    },
    {
      id: '3',
      type: 'payment_received',
      description: 'Payment received: $1,200.00',
      timestamp: '2024-01-15 14:30:08',
      severity: 'low',
    },
    {
      id: '4',
      type: 'system_alert',
      description: 'AI Marketplace maintenance scheduled',
      timestamp: '2024-01-15 14:28:45',
      severity: 'medium',
    },
    {
      id: '5',
      type: 'module_update',
      description: 'PSS module updated to v2.1.0',
      timestamp: '2024-01-15 14:25:30',
      severity: 'low',
    },
  ],

  systemMetrics: {
    cpuUsage: 45,
    memoryUsage: 67,
    diskUsage: 23,
    networkTraffic: 89,
    uptime: '99.9%',
    responseTime: '120ms',
  },
};

// GET /api/admin/stats
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') || 'overview';

    let data;

    switch (type) {
      case 'overview':
        data = adminStats.overview;
        break;
      case 'modules':
        data = adminStats.moduleStats;
        break;
      case 'activity':
        data = adminStats.recentActivity;
        break;
      case 'metrics':
        data = adminStats.systemMetrics;
        break;
      case 'all':
        data = adminStats;
        break;
      default:
        data = adminStats.overview;
    }

    return NextResponse.json({
      success: true,
      data,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('GET /api/admin/stats error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch admin statistics' },
      { status: 500 }
    );
  }
}
