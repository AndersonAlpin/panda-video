import { Service } from 'typedi';
import redis from '../../config/redisConnection';

@Service()
export class CacheService {
  async get(key: string): Promise<any | null> {
    const data = await redis.get(key);
    return data ? JSON.parse(data) : null;
  }

  async set(key: string, value: any, ttl: number): Promise<void> {
    await redis.set(key, JSON.stringify(value), 'EX', ttl);
  }

  async del(key: string): Promise<void> {
    await redis.del(key);
  }
}
