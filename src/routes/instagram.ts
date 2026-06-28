import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { instagramSchema } from '../schemas';
import { InstagramService } from '../services/instagram.service';
import { successResponse, errorResponse } from '../utils/response';

const instagram = new Hono();
const service = new InstagramService();

instagram.post('/video', zValidator('json', instagramSchema), async (c) => {
  const { url } = c.req.valid('json');
  const result = await service.getVideoInfo(url);

  if (!result.success) {
    return errorResponse(c, result.error || 'Failed to fetch Instagram video', 400);
  }

  return successResponse(c, result.data);
});

export default instagram;
