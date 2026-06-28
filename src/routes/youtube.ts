import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { youtubeSchema } from '../schemas';
import { YouTubeService } from '../services/youtube.service';
import { successResponse, errorResponse } from '../utils/response';

const youtube = new Hono();
const service = new YouTubeService();

youtube.post('/video', zValidator('json', youtubeSchema), async (c) => {
  const { url } = c.req.valid('json');
  const result = await service.getVideoInfo(url);

  if (!result.success) {
    return errorResponse(c, result.error || 'Failed to fetch YouTube video', 400);
  }

  return successResponse(c, result.data);
});

export default youtube;
