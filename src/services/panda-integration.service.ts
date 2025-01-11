import { Service } from 'typedi';
import axios, { AxiosInstance } from 'axios';
import { envConfig } from '../config/envConfig';
import { RequestError } from '../errors/RequestError';

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

      return response.data;
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
    try {
      const response = await this.axiosInstance.get(`/videos/${videoId}`);
      return response.data;
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
