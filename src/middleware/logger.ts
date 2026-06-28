import { createMiddleware } from 'hono/factory';
import { logger } from '../utils/logger';

export const loggingMiddleware = createMiddleware(async (c, next) => {
  const start = Date.now();
  const { method, path } = c.req;

  logger.info({ method, path, query: c.req.query() }, 'Request started');

  await next();

  const duration = Date.now() - start;
  const status = c.res.status;

  logger.info(
    { method, path, status, duration: `${duration}ms` },
    'Request completed'
  );
});
