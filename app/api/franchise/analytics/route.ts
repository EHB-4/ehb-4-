import { NextRequest, NextResponse } from 'next/server';

// Mock analytics data
const analyticsData = {
  // Monthly trends
  monthlyTrends: [
    { month: 'Jan 2024', applications: 12, approvals: 8, revenue: 450000, growth: 15 },
    { month: 'Feb 2024', applications: 15, approvals: 11, revenue: 520000, growth: 18 },
    { month: 'Mar 2024', applications: 18, approvals: 14, revenue: 680000, growth: 22 },
    { month: 'Apr 2024', applications: 22, approvals: 17, revenue: 750000, growth: 25 },
    { month: 'May 2024', applications: 25, approvals: 20, revenue: 890000, growth: 28 },
    { month: 'Jun 2024', applications: 28, approvals: 23, revenue: 1020000, growth: 30 },
  ],

  // Category performance
  categoryPerformance: [
    {
      category: 'Health & Wellness',
      applications: 45,
      revenue: 1200000,
      successRate: 85,
      avgInvestment: 180000,
    },
    {
      category: 'Education & Training',
      applications: 38,
      revenue: 950000,
      successRate: 90,
      avgInvestment: 120000,
    },
    {
      category: 'Legal Services',
      applications: 25,
      revenue: 1800000,
      successRate: 75,
      avgInvestment: 250000,
    },
    {
      category: 'Travel & Tourism',
      applications: 22,
      revenue: 650000,
      successRate: 80,
      avgInvestment: 80000,
    },
    {
      category: 'Books & Publishing',
      applications: 18,
      revenue: 450000,
      successRate: 70,
      avgInvestment: 100000,
    },
  ],

  // Geographic distribution
  geographicDistribution: [
    { location: 'Karachi', applications: 35, revenue: 850000, growth: 25 },
    { location: 'Lahore', applications: 28, revenue: 720000, growth: 22 },
    { location: 'Islamabad', applications: 20, revenue: 650000, growth: 20 },
    { location: 'Faisalabad', applications: 15, revenue: 380000, growth: 18 },
    { location: 'Peshawar', applications: 12, revenue: 300000, growth: 15 },
    { location: 'Other Cities', applications: 25, revenue: 600000, growth: 12 },
  ],

  // Status distribution
  statusDistribution: [
    { status: 'Pending', count: 45, percentage: 35 },
    { status: 'Approved', count: 32, percentage: 25 },
    { status: 'Under Review', count: 18, percentage: 14 },
    { status: 'Rejected', count: 8, percentage: 6 },
    { status: 'Active', count: 25, percentage: 20 },
  ],

  // Investment ranges
  investmentRanges: [
    { range: '$20K - $50K', count: 25, percentage: 20 },
    { range: '$50K - $100K', count: 35, percentage: 28 },
    { range: '$100K - $250K', count: 30, percentage: 24 },
    { range: '$250K - $500K', count: 20, percentage: 16 },
    { range: '$500K+', count: 15, percentage: 12 },
  ],

  // ROI analysis
  roiAnalysis: [
    { category: 'Health & Wellness', avgROI: 25, maxROI: 35, minROI: 15 },
    { category: 'Education & Training', avgROI: 30, maxROI: 40, minROI: 20 },
    { category: 'Legal Services', avgROI: 35, maxROI: 45, minROI: 25 },
    { category: 'Travel & Tourism', avgROI: 28, maxROI: 38, minROI: 18 },
    { category: 'Books & Publishing', avgROI: 22, maxROI: 32, minROI: 12 },
  ],

  // Key metrics
  keyMetrics: {
    totalApplications: 128,
    totalApprovals: 32,
    totalRevenue: 2400000,
    avgProcessingTime: 14, // days
    successRate: 85, // percentage
    avgInvestment: 150000,
    totalActiveFranchises: 25,
    monthlyGrowth: 25, // percentage
  },
};

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const period = searchParams.get('period') || '6months';
    const category = searchParams.get('category');

    let responseData: any = {};

    switch (type) {
      case 'monthly-trends':
        responseData = analyticsData.monthlyTrends;
        break;

      case 'category-performance':
        responseData = category
          ? analyticsData.categoryPerformance.filter(c =>
              c.category.toLowerCase().includes(category.toLowerCase())
            )
          : analyticsData.categoryPerformance;
        break;

      case 'geographic-distribution':
        responseData = analyticsData.geographicDistribution;
        break;

      case 'status-distribution':
        responseData = analyticsData.statusDistribution;
        break;

      case 'investment-ranges':
        responseData = analyticsData.investmentRanges;
        break;

      case 'roi-analysis':
        responseData = category
          ? analyticsData.roiAnalysis.filter(r =>
              r.category.toLowerCase().includes(category.toLowerCase())
            )
          : analyticsData.roiAnalysis;
        break;

      case 'key-metrics':
        responseData = analyticsData.keyMetrics;
        break;

      case 'all':
        responseData = {
          monthlyTrends: analyticsData.monthlyTrends,
          categoryPerformance: analyticsData.categoryPerformance,
          geographicDistribution: analyticsData.geographicDistribution,
          statusDistribution: analyticsData.statusDistribution,
          investmentRanges: analyticsData.investmentRanges,
          roiAnalysis: analyticsData.roiAnalysis,
          keyMetrics: analyticsData.keyMetrics,
        };
        break;

      default:
        responseData = analyticsData.keyMetrics;
    }

    // Calculate additional insights
    const insights = {
      topPerformingCategory: analyticsData.categoryPerformance.reduce((prev, current) =>
        prev.revenue > current.revenue ? prev : current
      ),
      fastestGrowingLocation: analyticsData.geographicDistribution.reduce((prev, current) =>
        prev.growth > current.growth ? prev : current
      ),
      highestROI: analyticsData.roiAnalysis.reduce((prev, current) =>
        prev.avgROI > current.avgROI ? prev : current
      ),
      mostPopularInvestmentRange: analyticsData.investmentRanges.reduce((prev, current) =>
        prev.count > current.count ? prev : current
      ),
    };

    return NextResponse.json({
      success: true,
      data: responseData,
      insights,
      period,
      category,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error fetching analytics:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch analytics data' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, data, filters } = body;

    // Here you would typically save analytics data to a database
    // For now, we'll just return a success response
    console.log('Analytics data received:', { type, data, filters });

    return NextResponse.json({
      success: true,
      message: 'Analytics data processed successfully',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error processing analytics:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process analytics data' },
      { status: 500 }
    );
  }
}
