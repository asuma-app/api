import { createServer } from './server';
import { env } from './config/env';
import { logger } from './utils/logger';

const app = createServer();
const port = parseInt(env.PORT);

Bun.serve({
  fetch: app.fetch,
  port,
  hostname: '0.0.0.0',
});

logger.info(`🚀 Server running on http://localhost:${port}`);
logger.info(`📚 API Documentation: http://localhost:${port}/api/v1/health`);
logger.info(`🌍 Environment: ${env.NODE_ENV}`);
