import { defineStore } from 'pinia';
import type { LoginResponse, User } from '@/interfaces/AuthDef';
import { envConfig } from '@/config/envConfig';
import ApiService from '@/services/ApiService';

interface AuthState {
  token: string | null;
  user: User | null;
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    token: null,
    user: null,
  }),
  actions: {
    async login(email: string, password: string) {
      try {
        const data = await ApiService.post<LoginResponse>('/auth/login', {
          email,
          password,
        });

        this.token = data.token;
        
        await this.fetchUserSession();
      } catch (error) {
        console.error('Login failed:', error);
        throw error;
      }
    },

    async fetchUserSession() {
      if (this.token) {
        try {
          const data = await ApiService.get<User>(`${envConfig.PANDA_BACKEND_URL}/auth/session`, {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          });

          this.user = data;
        } catch (error) {
          console.error('Failed to fetch user data:', error);
        }
      }
    },

    logout() {
      this.$reset();
    },
  },
  getters: {
    isAuthenticated: (state) => !!state.token,
  },
  persist: true
});
