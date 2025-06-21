import { NextRequest, NextResponse } from 'next/server';

// Mock analytics data
const analyticsData = {
  overview: {
    totalOrders: 1247,
    totalProducts: 89,
    totalCustomers: 3421,
    totalRevenue: 45678.9,
    pendingOrders: 23,
    lowStockProducts: 7,
    growthRate: 23.5,
    averageOrderValue: 36.67,
  },

  salesData: {
    daily: [
      { date: '2024-01-10', sales: 1250, orders: 34 },
      { date: '2024-01-11', sales: 1380, orders: 37 },
      { date: '2024-01-12', sales: 1420, orders: 39 },
      { date: '2024-01-13', sales: 1580, orders: 42 },
      { date: '2024-01-14', sales: 1620, orders: 45 },
      { date: '2024-01-15', sales: 1750, orders: 48 },
    ],
    monthly: [
      { month: 'Jan', sales: 45678, orders: 1247 },
      { month: 'Dec', sales: 38945, orders: 1089 },
      { month: 'Nov', sales: 42356, orders: 1156 },
      { month: 'Oct', sales: 39876, orders: 1098 },
    ],
  },

  topProducts: [
    { id: '1', name: 'Premium Wireless Headphones', sales: 45, revenue: 8995.55 },
    { id: '2', name: 'Organic Cotton T-Shirt', sales: 128, revenue: 3838.72 },
    { id: '3', name: 'Smart Fitness Watch', sales: 67, revenue: 20099.33 },
    { id: '4', name: 'Laptop Stand', sales: 89, revenue: 8008.11 },
    { id: '5', name: 'USB Cable', sales: 156, revenue: 9284.44 },
  ],

  topCategories: [
    { name: 'Electronics', sales: 234, revenue: 45678.9 },
    { name: 'Clothing', sales: 189, revenue: 5678.11 },
    { name: 'Books', sales: 145, revenue: 2345.67 },
    { name: 'Home & Garden', sales: 98, revenue: 3456.78 },
  ],

  customerMetrics: {
    newCustomers: 234,
    returningCustomers: 567,
    customerRetentionRate: 78.5,
    averageCustomerLifetimeValue: 156.78,
  },

  inventoryMetrics: {
    totalStockValue: 123456.78,
    lowStockItems: 7,
    outOfStockItems: 3,
    stockTurnoverRate: 4.2,
  },
};

// GET /api/emo/analytics
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') || 'overview';

    let data;

    switch (type) {
      case 'overview':
        data = analyticsData.overview;
        break;
      case 'sales':
        data = analyticsData.salesData;
        break;
      case 'products':
        data = analyticsData.topProducts;
        break;
      case 'categories':
        data = analyticsData.topCategories;
        break;
      case 'customers':
        data = analyticsData.customerMetrics;
        break;
      case 'inventory':
        data = analyticsData.inventoryMetrics;
        break;
      case 'all':
        data = analyticsData;
        break;
      default:
        data = analyticsData.overview;
    }

    return NextResponse.json({
      success: true,
      data,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('GET /api/emo/analytics error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch analytics data' },
      { status: 500 }
    );
  }
}
