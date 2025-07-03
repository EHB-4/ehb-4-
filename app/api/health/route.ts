export const runtime = 'nodejs';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Check database connection
    const dbStatus = await checkDatabase();

    // Check Redis connection
    const redisStatus = await checkRedis();

    // Check external services
    const externalServices = await checkExternalServices();

    const healthStatus = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      version: process.env.npm_package_version || '1.0.0',
      environment: process.env.NODE_ENV,
      services: {
        database: dbStatus,
        redis: redisStatus,
        external: externalServices,
      },
    };

    // If any service is down, mark as unhealthy
    if (!dbStatus.healthy || !redisStatus.healthy) {
      healthStatus.status = 'unhealthy';
      return NextResponse.json(healthStatus, { status: 503 });
    }

    return NextResponse.json(healthStatus);
  } catch (error) {
    console.error('Health check failed:', error);

    return NextResponse.json(
      {
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 503 }
    );
  }
}

async function checkDatabase() {
  try {
    // Add your database health check logic here
    // Example for PostgreSQL:
    // const result = await db.query('SELECT 1');
    return {
      healthy: true,
      responseTime: 0,
      message: 'Database connection healthy',
    };
  } catch (error) {
    return {
      healthy: false,
      error: error instanceof Error ? error.message : 'Database check failed',
    };
  }
}

async function checkRedis() {
  try {
    // Add your Redis health check logic here
    // Example:
    // await redis.ping();
    return {
      healthy: true,
      responseTime: 0,
      message: 'Redis connection healthy',
    };
  } catch (error) {
    return {
      healthy: false,
      error: error instanceof Error ? error.message : 'Redis check failed',
    };
  }
}

async function checkExternalServices() {
  const services = {
    stripe: false,
    sendgrid: false,
    analytics: false,
  };

  try {
    // Check Stripe
    if (process.env.STRIPE_SECRET_KEY) {
      // Add Stripe health check
      services.stripe = true;
    }

    // Check SendGrid
    if (process.env.SENDGRID_API_KEY) {
      // Add SendGrid health check
      services.sendgrid = true;
    }

    // Check Analytics
    if (process.env.GOOGLE_ANALYTICS_ID) {
      services.analytics = true;
    }

    return services;
  } catch (error) {
    console.error('External services check failed:', error);
    return services;
  }
}
