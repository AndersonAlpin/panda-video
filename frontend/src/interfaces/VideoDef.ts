export interface Video {
  id: string;
  title: string;
  description: string | null;
  status: string;
  user_id: string;
  folder_id: string;
  library_id: string;
  video_external_id: string;
  converted_at: string | null;
  created_at: string;
  updated_at: string;
  storage_size: number;
  length: number;
  video_player: string;
  video_hls: string;
  width: number;
  height: number;
  playable: boolean;
  backup: boolean;
  preview: string;
  thumbnail: string;
  playback: string[];
}

export interface VideoDetail extends Video {
  live_id: boolean | null;
  config: Record<string, unknown>;
}

export interface VideoList {
  pages: number;
  total: number;
  videos: Video[];
}