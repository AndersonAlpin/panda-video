import { defineStore } from 'pinia';
import ApiService from '@/services/ApiService';
import { envConfig } from '@/config/envConfig';
import type { VideoDetail, Video, VideoList } from '@/interfaces/VideoDef';

interface VideoState {
  videos: Video[] | null;
  total: number;
  pages: number;
  video: VideoDetail | null;
  loading: boolean;
}

interface FilterOptions {
  root_folder?: string;
  page?: number;
  limit?: number;
  title?: string;
  status?: string;
  folder_id?: string;
}

export const useVideoStore = defineStore('video', {
  state: (): VideoState => ({
    videos: null,
    total: 0,
    pages: 1,
    video: null,
    loading: false,
  }),

  actions: {
    async fetchAllVideos(filters?: FilterOptions) {
      this.loading = true;
      try {
        const response = await ApiService.get<VideoList>(`${envConfig.PANDA_BACKEND_URL}/video`, {
          params: filters,
        });
        this.videos = response.videos;
        this.total = response.total;
        this.pages = response.pages;
      } catch (error) {
        console.error('Failed to fetch videos:', error);
      } finally {
        this.loading = false;
      }
    },

    async fetchVideoById(video_id: string) {
      this.loading = true;
      try {
        const response = await ApiService.get<VideoDetail>(`${envConfig.PANDA_BACKEND_URL}/video/${video_id}`);
        this.video = response;
      } catch (error) {
        console.error('Failed to fetch video:', error);
      } finally {
        this.loading = false;
      }
    },
  },

  getters: {
    getVideos: (state) => state.videos || [],
    getTotal: (state) => state.total,
    getPages: (state) => state.pages,
    getVideo: (state) => state.video,
    isLoading: (state) => state.loading,
  },
});
