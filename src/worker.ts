import { Hono } from 'hono';
import { corsMiddleware } from './middleware/cors';
import { loggingMiddleware } from './middleware/logger';
import { errorHandler } from './middleware/error';
import { rateLimitMiddleware } from './middleware/rate-limit';
import routes from './routes';

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext) {
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

    app.get('/health', (c) => {
      return c.json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        service: 'hono-scraper-api',
        platform: 'cloudflare-workers',
      });
    });

    return app.fetch(request, env, ctx);
  },
};

interface Env {
  NODE_ENV: string;
}
