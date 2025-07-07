export const runtime = 'nodejs';
import { NextRequest, NextResponse } from 'next/server';

interface DevelopmentStats {
  projects: {
    total: number;
    completed: number;
    inProgress: number;
    planned: number;
  };
  clients: {
    total: number;
    active: number;
    newThisMonth: number;
  };
  revenue: {
    total: number;
    thisMonth: number;
    thisYear: number;
    averagePerProject: number;
  };
  team: {
    total: number;
    developers: number;
    designers: number;
    managers: number;
  };
  performance: {
    successRate: number;
    averageDeliveryTime: number;
    clientSatisfaction: number;
  };
  technologies: {
    mostUsed: string[];
    trending: string[];
  };
}

export async function GET() {
  try {
    // Mock development statistics
    const stats: DevelopmentStats = {
      projects: {
        total: 156,
        completed: 142,
        inProgress: 12,
        planned: 2,
      },
      clients: {
        total: 89,
        active: 67,
        newThisMonth: 8,
      },
      revenue: {
        total: 2850000,
        thisMonth: 185000,
        thisYear: 1250000,
        averagePerProject: 18269,
      },
      team: {
        total: 28,
        developers: 18,
        designers: 6,
        managers: 4,
      },
      performance: {
        successRate: 98.5,
        averageDeliveryTime: 45, // days
        clientSatisfaction: 4.8, // out of 5
      },
      technologies: {
        mostUsed: [
          'React',
          'Next.js',
          'TypeScript',
          'Node.js',
          'MongoDB',
          'PostgreSQL',
          'Tailwind CSS',
          'Docker',
        ],
        trending: [
          'AI/ML Integration',
          'Blockchain',
          'Web3',
          'Microservices',
          'Serverless',
          'Edge Computing',
        ],
      },
    };

    // Calculate additional metrics
    const completionRate = (stats.projects.completed / stats.projects.total) * 100;
    const monthlyGrowth = ((stats.revenue.thisMonth - 165000) / 165000) * 100; // Mock previous month

    const enhancedStats = {
      ...stats,
      metrics: {
        completionRate: Math.round(completionRate * 100) / 100,
        monthlyGrowth: Math.round(monthlyGrowth * 100) / 100,
        projectSuccessRate: stats.performance.successRate,
        averageProjectDuration: stats.performance.averageDeliveryTime,
      },
    };

    return NextResponse.json(enhancedStats, { status: 200 });
  } catch (error) {
    console.error('Stats API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
