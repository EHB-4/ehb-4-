import { Redis } from 'ioredis';

class CacheService {
  private redis: Redis;
  private isConnected = false;

  constructor() {
    this.redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');

    this.redis.on('connect', () => {
      this.isConnected = true;
      console.log('✅ Redis connected');
    });

    this.redis.on('error', error => {
      this.isConnected = false;
      console.error('❌ Redis error:', error);
    });
  }

  async get(key: string): Promise<any> {
    if (!this.isConnected) return null;

    try {
      const value = await this.redis.get(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.error('Cache get error:', error);
      return null;
    }
  }

  async set(key: string, value: any, ttl: number = 3600): Promise<void> {
    if (!this.isConnected) return;

    try {
      await this.redis.setex(key, ttl, JSON.stringify(value));
    } catch (error) {
      console.error('Cache set error:', error);
    }
  }

  async delete(key: string): Promise<void> {
    if (!this.isConnected) return;

    try {
      await this.redis.del(key);
    } catch (error) {
      console.error('Cache delete error:', error);
    }
  }

  async clear(): Promise<void> {
    if (!this.isConnected) return;

    try {
      await this.redis.flushall();
    } catch (error) {
      console.error('Cache clear error:', error);
    }
  }
}

export const cacheService = new CacheService();
export default cacheService;
