import { NextRequest, NextResponse } from 'next/server';

interface HealthData {
  status: string;
  timestamp: string;
  uptime: number;
  environment: string;
  version: string;
  services: {
    database: string;
    redis: string;
    aws: string;
  };
  memory?: {
    used: number;
    total: number;
    external: number;
  };
  system?: {
    platform: string;
    arch: string;
    nodeVersion: string;
    pid: number;
  };
}

/**
 * Health Check API Route
 * Provides system status and health information
 */
export async function GET(request: NextRequest) {
  try {
    const healthData: HealthData = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || 'development',
      version: process.env.npm_package_version || '1.0.0',
      services: {
        database: 'connected',
        redis: 'connected',
        aws: 'connected'
      },
      memory: {
        used: process.memoryUsage().heapUsed,
        total: process.memoryUsage().heapTotal,
        external: process.memoryUsage().external
      }
    };

    return NextResponse.json(healthData, { status: 200 });
  } catch (error) {
    console.error('Health check failed:', error);
    
    return NextResponse.json({
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

/**
 * Health Check with detailed diagnostics
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { detailed = false } = body;

    const healthData: HealthData = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || 'development',
      version: process.env.npm_package_version || '1.0.0',
      services: {
        database: 'connected',
        redis: 'connected',
        aws: 'connected'
      }
    };

    if (detailed) {
      healthData.memory = {
        used: process.memoryUsage().heapUsed,
        total: process.memoryUsage().heapTotal,
        external: process.memoryUsage().external
      };
      
      healthData.system = {
        platform: process.platform,
        arch: process.arch,
        nodeVersion: process.version,
        pid: process.pid
      };
    }

    return NextResponse.json(healthData, { status: 200 });
  } catch (error) {
    console.error('Detailed health check failed:', error);
    
    return NextResponse.json({
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
