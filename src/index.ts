import { createServer } from '../src/server';
import { env } from '../src/config/env';
import { logger } from '../src/utils/logger';

if (process.env.NODE_ENV === 'production') {
  process.env.PORT = '3000';
}

const app = createServer();

export default app;

if (process.env.NODE_ENV !== 'production' && typeof Bun !== 'undefined') {
  const port = parseInt(env.PORT);
  Bun.serve({
    fetch: app.fetch,
    port,
  });
  logger.info(`🚀 Server running on http://localhost:${port}`);
}
