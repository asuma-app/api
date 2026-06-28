import { createMiddleware } from 'hono/factory';
import { env } from '../config/env';

export const corsMiddleware = createMiddleware(async (c, next) => {
  const origin = env.CORS_ORIGIN;

  c.header('Access-Control-Allow-Origin', origin);
  c.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  c.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
  c.header('Access-Control-Allow-Credentials', 'true');
  c.header('Access-Control-Max-Age', '86400');

  if (c.req.method === 'OPTIONS') {
    return c.text('', { status: 204 });
  }

  await next();
});
