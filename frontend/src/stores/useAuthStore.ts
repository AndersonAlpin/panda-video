import { defineStore } from 'pinia';
import axios from 'axios';
import type { LoginResponse, User } from '@/interfaces/AuthDef';
import { envConfig } from '@/config/envConfig';

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
        const response = await axios.post<LoginResponse>(`${envConfig.PANDA_BACKEND_URL}/auth/login`, {
          email,
          password,
        });

        this.token = response.data.token;
        
        await this.fetchUserSession();
      } catch (error) {
        console.error('Login failed:', error);
        throw error;
      }
    },

    async fetchUserSession() {
      if (this.token) {
        try {
          const response = await axios.get<User>(`${envConfig.PANDA_BACKEND_URL}/auth/session`, {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          });

          this.user = response.data;
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
