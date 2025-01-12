import Redis from 'ioredis';
import { envConfig } from './envConfig';

const redis = new Redis({
  host: envConfig.REDIS.HOST,
  port: envConfig.REDIS.PORT,
});

redis.on('connect', () => {
  console.log('Connected to Redis');
});

redis.on('error', (err) => {
  console.error('Redis connection error:', err);
});

export default redis;
