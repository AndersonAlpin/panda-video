import dotenv from 'dotenv';

dotenv.config();

interface EnvConfig {
  PORT: string;
  DB: {
    HOST: string;
    PORT: string;
    USER: string;
    PASSWORD: string;
    NAME: string;
    URL: string;
  };
  AUTH: {
    JWT_SECRET: string;
    JWT_EXPIRATION: string;
  };
  INTEGRATIONS: {
    PANDA_API_KEY: string;
    PANDA_API_URL: string;
  };
}

export const envConfig: EnvConfig = {
  PORT: process.env.PORT || '3000',
  DB: {
    HOST: process.env.DB_HOST || 'localhost',
    PORT: process.env.DB_PORT || '5433',
    USER: process.env.DB_USER || 'panda',
    PASSWORD: process.env.DB_PASSWORD || 'Panda123',
    NAME: process.env.DB_NAME || 'panda_video',
    URL: process.env.DATABASE_URL || 'postgresql://panda:Panda123@db:5432/panda_video?schema=public',
  },
  AUTH: {
    JWT_SECRET: process.env.JWT_SECRET || 'afd184202f514c87ac2c91f18ecad523',
    JWT_EXPIRATION: process.env.JWT_EXPIRATION || '3h',
  },
  INTEGRATIONS: {
    PANDA_API_KEY: process.env.PANDA_API_KEY || 'panda-6fa580749522c3db80bf85c5d84e84db0d8888a72bac06b79bf50138597b47af',
    PANDA_API_URL: process.env.PANDA_API_URL || 'https://api-v2.pandavideo.com.br',
  },
};
