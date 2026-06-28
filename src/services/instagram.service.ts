import { VideoInfo, ScraperResponse } from '../types';
import { logger } from '../utils/logger';

export class InstagramService {
  async getVideoInfo(url: string): Promise<ScraperResponse<VideoInfo>> {
    try {
      logger.info({ url }, 'Fetching Instagram video info');

      const mockData: VideoInfo = {
        id: 'instagram_' + Date.now().toString(36),
        title: 'Sample Instagram Video',
        description: 'This is a sample Instagram video description',
        url: url,
        thumbnail: 'https://example.com/thumbnail.jpg',
        duration: 30,
        views: 5000,
        likes: 2000,
        comments: 500,
        shares: 100,
        author: {
          username: 'sample_user',
          name: 'Sample User',
          verified: false,
        },
        createdAt: new Date().toISOString(),
        platform: 'instagram',
      };

      return {
        success: true,
        data: mockData,
        source: 'instagram',
      };
    } catch (error) {
      logger.error({ error, url }, 'Failed to fetch Instagram video info');
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch Instagram video',
        source: 'instagram',
      };
    }
  }
}
