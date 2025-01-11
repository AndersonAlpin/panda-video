import Container, { Service } from 'typedi';
import axios, { AxiosInstance } from 'axios';
import { envConfig } from '../config/envConfig';
import { RequestError } from '../errors/RequestError';
import { CacheService } from '../shared/services/cache.service';

const cacheService = Container.get(CacheService);

@Service()
export class PandaIntegrationService {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: envConfig.INTEGRATIONS.PANDA_API_URL,
      headers: {
        'Authorization': `${envConfig.INTEGRATIONS.PANDA_API_KEY}`,
        'Content-Type': 'application/json',
      },
    });
  }

  async fetchAllVideos(filters: any): Promise<any> {
    const cacheKey = `videos:filters:${JSON.stringify(filters)}`;
    const cacheData = await cacheService.get(cacheKey);

    if (cacheData) {
      return cacheData;
    }

    try {
      const { root_folder, page, limit, title, status, folder_id } = filters;

      const params: any = {
        root_folder,
        page,
        limit,
        title,
        status,
        folder_id,
      };

      Object.keys(params).forEach(key => params[key] === undefined || params[key] === null ? delete params[key] : {});

      const response = await this.axiosInstance.get('/videos', { params });
      const videos = response.data;

      await cacheService.set(cacheKey, videos, 20);

      return videos;
    } catch (err: any) {
      if (err.response) {
        const statusCode = err.response.status;
        const errorMessage = err.response.data.errMsg || err.message;

        throw new RequestError(errorMessage, statusCode);
      }

      throw new RequestError('An unknown error occurred', 500);
    }
  }

  async fetchVideoById(videoId: string): Promise<any> {
    const cacheKey = `video:${videoId}`;
    const cacheData = await cacheService.get(cacheKey);

    if (cacheData) {
      return cacheData;
    }

    try {
      const response = await this.axiosInstance.get(`/videos/${videoId}`);
      const video = response.data;

      await cacheService.set(cacheKey, video, 20);

      return video;
    } catch (err: any) {
      if (err.response) {
        const statusCode = err.response.status;
        const errorMessage = err.response.data.errMsg || err.message;

        throw new RequestError(errorMessage, statusCode);
      }

      throw new RequestError('An unknown error occurred', 500);
    }
  }
}
