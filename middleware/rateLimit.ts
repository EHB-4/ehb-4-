import Redis from 'ioredis';
import { NextApiRequest, NextApiResponse } from 'next';

const redis = new Redis(process.env.REDIS_URL || '');

const WINDOW_SIZE = 60; // 1 minute
const MAX_REQUESTS = 100; // 100 requests per minute

export default async function rateLimit(
  req: NextApiRequest,
  res: NextApiResponse,
  next: () => void
) {
  const key = `rate-limit:${req.ip}`;

  try {
    const requests = await redis.incr(key);
    if (requests === 1) {
      await redis.expire(key, WINDOW_SIZE);
    }

    if (requests > MAX_REQUESTS) {
      return res.status(429).json({
        error: 'Too many requests',
        retryAfter: await redis.ttl(key),
      });
    }

    next();
  } catch (error) {
    console.error('Rate limit error:', error);
    next();
  }
}

// Export different rate limit configurations
export const rateLimits = {
  strict: {
    windowMs: 60 * 1000, // 1 minute
    max: 30,
    message: 'Too many requests, please try again in a minute.',
  },
  moderate: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100,
    message: 'Rate limit exceeded, please try again later.',
  },
  lenient: {
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 1000,
    message: 'Hourly rate limit exceeded.',
  },
};
