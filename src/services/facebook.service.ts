import { VideoInfo, ScraperResponse } from '../types';
import { logger } from '../utils/logger';

export class FacebookService {
  async getVideoInfo(url: string): Promise<ScraperResponse<VideoInfo>> {
    try {
      logger.info({ url }, 'Fetching Facebook video info');

      const mockData: VideoInfo = {
        id: 'facebook_' + Date.now().toString(36),
        title: 'Sample Facebook Video',
        description: 'This is a sample Facebook video description',
        url: url,
        thumbnail: 'https://example.com/thumbnail.jpg',
        duration: 90,
        views: 8000,
        likes: 3000,
        comments: 800,
        shares: 150,
        author: {
          username: 'sample_user',
          name: 'Sample User',
          verified: false,
        },
        createdAt: new Date().toISOString(),
        platform: 'facebook',
      };

      return {
        success: true,
        data: mockData,
        source: 'facebook',
      };
    } catch (error) {
      logger.error({ error, url }, 'Failed to fetch Facebook video info');
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch Facebook video',
        source: 'facebook',
      };
    }
  }
}
