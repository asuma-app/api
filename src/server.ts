import { Hono } from 'hono';
import { corsMiddleware } from './middleware/cors';
import { loggingMiddleware } from './middleware/logger';
import { rateLimitMiddleware } from './middleware/rate-limit';
import { errorHandler } from './middleware/error';
import routes from './routes';
import { logger } from './utils/logger';

export const createServer = () => {
  const app = new Hono();

  app.use('*', corsMiddleware);
  app.use('*', loggingMiddleware);
  app.use('*', rateLimitMiddleware);
  app.use('*', errorHandler);

  app.route('/api/v1', routes);

  app.notFound((c) => {
    return c.json(
      {
        success: false,
        error: 'Route not found',
        timestamp: new Date().toISOString(),
        path: c.req.path,
      },
      404
    );
  });

  return app;
};
