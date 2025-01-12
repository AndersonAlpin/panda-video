import { envConfig } from '@/config/envConfig';
import { useAuthStore } from '@/stores/useAuthStore';
import axios, { type AxiosInstance, type AxiosResponse } from 'axios';

class ApiService {
  private api: AxiosInstance;
  private authStore = useAuthStore();

  constructor() {
    this.api = axios.create({
      baseURL: envConfig.PANDA_BACKEND_URL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.api.interceptors.request.use((config) => {
      const token = this.authStore.token;
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
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

  getErrorMessage(error: unknown): string {
    if (axios.isAxiosError(error)) {
      if (error.response?.data?.message) {
        return error.response.data.message;
      }
      if (error.message) {
        return error.message;
      }
    }
    return 'An unexpected error occurred.';
  }
}

export default new ApiService();
