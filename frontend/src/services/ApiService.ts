import { envConfig } from '@/config/envConfig';
import axios, { type AxiosInstance, type AxiosResponse } from 'axios';

class ApiService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: envConfig.PANDA_BACKEND_URL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.api.interceptors.request.use((config) => {
      const localStorageAuth = localStorage.getItem('auth');
      if (localStorageAuth) {
        config.headers['Authorization'] = `Bearer ${JSON.parse(localStorageAuth).token}`;
      }
      return config;
    });
  }

  async get<T>(endpoint: string, params?: Record<string, unknown>): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.api.get(endpoint, { params });
      return response.data;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  async post<T>(endpoint: string, data?: unknown): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.api.post(endpoint, data);
      return response.data;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  async put<T>(endpoint: string, data?: unknown): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.api.put(endpoint, data);
      return response.data;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  async patch<T>(endpoint: string, data?: unknown): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.api.patch(endpoint, data);
      return response.data;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  async delete<T>(endpoint: string, params?: Record<string, unknown>): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.api.delete(endpoint, { params });
      return response.data;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  private handleError(error: unknown): void {
    if (axios.isAxiosError(error)) {
      console.error('Erro na requisição Axios:', error.response?.data || error.message);
    } else {
      console.error('Erro desconhecido:', error);
    }
  }

  getError(error: unknown): { statusCode: number | null; message: string } {
    if (axios.isAxiosError(error)) {
      const statusCode = error.response?.status || null;
      const message = error.response?.data?.message || error.message || 'An unexpected error occurred.';
      return { statusCode, message };
    }
  
    return { statusCode: null, message: 'An unexpected error occurred.' };
  }  
}

export default new ApiService();
