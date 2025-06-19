import { Redis } from '@upstash/redis';
import { NextRequest, NextResponse } from 'next/server';

// Rate limit configurations
const RATE_LIMITS = {
  // General API endpoints
  default: {
    requests: 100,
    window: 60, // 1 minute
  },
  // Authentication endpoints
  auth: {
    requests: 5,
    window: 300, // 5 minutes
  },
  // OpenAI endpoints
  openai: {
    requests: 10,
    window: 60, // 1 minute
  },
  // Payment endpoints
  payment: {
    requests: 20,
    window: 300, // 5 minutes
  },
  // File upload endpoints
  upload: {
    requests: 10,
    window: 300, // 5 minutes
  },
  // Admin endpoints
  admin: {
    requests: 50,
    window: 60, // 1 minute
  },
} as const;

type RateLimitType = keyof typeof RATE_LIMITS;

// Initialize Redis client
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_URL!,
  token: process.env.UPSTASH_REDIS_TOKEN!,
});

export interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  reset: number;
  retryAfter?: number;
}

/**
 * Rate limiter class with Redis backend
 */
export class RateLimiter {
  private redis: Redis;

  constructor() {
    this.redis = redis;
  }

  /**
   * Check rate limit for a specific identifier
   */
  async checkLimit(identifier: string, type: RateLimitType = 'default'): Promise<RateLimitResult> {
    const config = RATE_LIMITS[type];
    const key = `rate_limit:${type}:${identifier}`;
    const now = Date.now();
    const windowStart = now - config.window * 1000;

    try {
      // Get current requests in window
      const requests = await this.redis.zrangebyscore(key, windowStart, '+inf');
      const currentCount = requests.length;

      if (currentCount >= config.requests) {
        // Rate limit exceeded
        const oldestRequest = await this.redis.zrange(key, 0, 0, { withScores: true });
        const resetTime = oldestRequest[0]?.score || now + config.window * 1000;
        const retryAfter = Math.ceil((resetTime - now) / 1000);

        return {
          success: false,
          limit: config.requests,
          remaining: 0,
          reset: resetTime,
          retryAfter,
        };
      }

      // Add current request
      await this.redis.zadd(key, now, now.toString());
      await this.redis.expire(key, config.window);

      return {
        success: true,
        limit: config.requests,
        remaining: config.requests - currentCount - 1,
        reset: now + config.window * 1000,
      };
    } catch (error) {
      console.error('Rate limit check failed:', error);
      // Allow request if Redis is unavailable
      return {
        success: true,
        limit: config.requests,
        remaining: config.requests - 1,
        reset: now + config.window * 1000,
      };
    }
  }

  /**
   * Get rate limit type based on request path
   */
  getRateLimitType(path: string): RateLimitType {
    if (path.startsWith('/api/auth')) return 'auth';
    if (path.startsWith('/api/openai')) return 'openai';
    if (path.startsWith('/api/payoneer') || path.startsWith('/api/payments')) return 'payment';
    if (path.startsWith('/api/admin')) return 'admin';
    if (path.includes('upload')) return 'upload';
    return 'default';
  }

  /**
   * Get identifier for rate limiting (IP, user ID, or session)
   */
  getIdentifier(req: NextRequest, userId?: string): string {
    if (userId) return `user:${userId}`;

    // Use IP address as fallback
    const forwarded = req.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0] : req.ip || 'unknown';
    return `ip:${ip}`;
  }
}

// Global rate limiter instance
export const rateLimiter = new RateLimiter();

/**
 * Rate limiting middleware
 */
export async function withRateLimit(
  req: NextRequest,
  handler: () => Promise<NextResponse>,
  userId?: string
): Promise<NextResponse> {
  const path = req.nextUrl.pathname;
  const type = rateLimiter.getRateLimitType(path);
  const identifier = rateLimiter.getIdentifier(req, userId);

  const result = await rateLimiter.checkLimit(identifier, type);

  if (!result.success) {
    return NextResponse.json(
      {
        error: 'Rate limit exceeded',
        message: 'Too many requests. Please try again later.',
        retryAfter: result.retryAfter,
      },
      {
        status: 429,
        headers: {
          'X-RateLimit-Limit': result.limit.toString(),
          'X-RateLimit-Remaining': result.remaining.toString(),
          'X-RateLimit-Reset': result.reset.toString(),
          'Retry-After': result.retryAfter?.toString() || '60',
        },
      }
    );
  }

  // Add rate limit headers to response
  const response = await handler();

  response.headers.set('X-RateLimit-Limit', result.limit.toString());
  response.headers.set('X-RateLimit-Remaining', result.remaining.toString());
  response.headers.set('X-RateLimit-Reset', result.reset.toString());

  return response;
}

/**
 * Rate limit decorator for API routes
 */
export function withRateLimitDecorator(type?: RateLimitType) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (req: NextRequest, ...args: any[]) {
      const identifier = rateLimiter.getIdentifier(req);
      const limitType = type || rateLimiter.getRateLimitType(req.nextUrl.pathname);

      const result = await rateLimiter.checkLimit(identifier, limitType);

      if (!result.success) {
        return NextResponse.json(
          {
            error: 'Rate limit exceeded',
            message: 'Too many requests. Please try again later.',
            retryAfter: result.retryAfter,
          },
          { status: 429 }
        );
      }

      return originalMethod.apply(this, [req, ...args]);
    };

    return descriptor;
  };
}
