import { createMiddleware } from 'hono/factory';
import { env } from '../config/env';

const rateLimits = new Map<string, { count: number; resetTime: number }>();

export const rateLimitMiddleware = createMiddleware(async (c, next) => {
  const ip = c.req.header('x-forwarded-for') || c.req.header('x-real-ip') || 'unknown';
  const maxRequests = parseInt(env.RATE_LIMIT_MAX);
  const windowMs = parseInt(env.RATE_LIMIT_WINDOW_MS);
  const now = Date.now();

  const record = rateLimits.get(ip);
  if (!record) {
    rateLimits.set(ip, {
      count: 1,
      resetTime: now + windowMs,
    });
    await next();
    return;
  }

  if (now > record.resetTime) {
    rateLimits.set(ip, {
      count: 1,
      resetTime: now + windowMs,
    });
    await next();
    return;
  }

  if (record.count >= maxRequests) {
    return c.json(
      {
        success: false,
        error: 'Rate limit exceeded. Please try again later.',
        timestamp: new Date().toISOString(),
        retryAfter: Math.ceil((record.resetTime - now) / 1000),
      },
      429
    );
  }

  record.count += 1;
  await next();
});

setInterval(() => {
  const now = Date.now();
  for (const [ip, record] of rateLimits.entries()) {
    if (now > record.resetTime) {
      rateLimits.delete(ip);
    }
  }
}, 60000);
