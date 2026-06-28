import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { tiktokSchema } from '../schemas';
import { TikTokService } from '../services/tiktok.service';
import { successResponse, errorResponse } from '../utils/response';

const tiktok = new Hono();
const service = new TikTokService();

tiktok.post('/video', zValidator('json', tiktokSchema), async (c) => {
  const { url } = c.req.valid('json');
  const result = await service.getVideoInfo(url);

  if (!result.success) {
    return errorResponse(c, result.error || 'Failed to fetch TikTok video', 400);
  }

  return successResponse(c, result.data);
});

export default tiktok;
