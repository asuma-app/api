import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { facebookSchema } from '../schemas';
import { FacebookService } from '../services/facebook.service';
import { successResponse, errorResponse } from '../utils/response';

const facebook = new Hono();
const service = new FacebookService();

facebook.post('/video', zValidator('json', facebookSchema), async (c) => {
  const { url } = c.req.valid('json');
  const result = await service.getVideoInfo(url);

  if (!result.success) {
    return errorResponse(c, result.error || 'Failed to fetch Facebook video', 400);
  }

  return successResponse(c, result.data);
});

export default facebook;
