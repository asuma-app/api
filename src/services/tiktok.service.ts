import { VideoInfo, ScraperResponse } from '../types';
import { logger } from '../utils/logger';

export class TikTokService {
  async getVideoInfo(url: string): Promise<ScraperResponse<VideoInfo>> {
    try {
      logger.info({ url }, 'Fetching TikTok video info');

      const mockData: VideoInfo = {
        id: 'tiktok_' + Date.now().toString(36),
        title: 'Sample TikTok Video',
        description: 'This is a sample TikTok video description',
        url: url,
        thumbnail: 'https://example.com/thumbnail.jpg',
        duration: 60,
        views: 1000,
        likes: 500,
        comments: 100,
        shares: 50,
        author: {
          username: 'sample_user',
          name: 'Sample User',
          verified: false,
        },
        createdAt: new Date().toISOString(),
        platform: 'tiktok',
      };

      return {
        success: true,
        data: mockData,
        source: 'tiktok',
      };
    } catch (error) {
      logger.error({ error, url }, 'Failed to fetch TikTok video info');
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch TikTok video',
        source: 'tiktok',
      };
    }
  }
}
