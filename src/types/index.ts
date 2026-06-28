export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  timestamp: string;
  path?: string;
}

export interface ScraperResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  source?: string;
}

export interface VideoInfo {
  id: string;
  title: string;
  description?: string;
  url: string;
  thumbnail?: string;
  duration?: number;
  views?: number;
  likes?: number;
  comments?: number;
  shares?: number;
  author?: {
    id?: string;
    username: string;
    name?: string;
    avatar?: string;
    verified?: boolean;
  };
  createdAt?: string;
  platform: 'tiktok' | 'youtube' | 'instagram' | 'facebook';
}
