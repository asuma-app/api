import { createMiddleware } from 'hono/factory';
import { HTTPException } from 'hono/http-exception';
import { ZodError } from 'zod';
import { errorResponse } from '../utils/response';
import { logger } from '../utils/logger';
import { env } from '../config/env';

export const errorHandler = createMiddleware(async (c, next) => {
  try {
    await next();
  } catch (error) {
    logger.error({ error }, 'Error occurred');

    if (error instanceof HTTPException) {
      return errorResponse(c, error.message, error.status);
    }

    if (error instanceof ZodError) {
      const message = error.errors.map((e) => `${e.path.join('.')}: ${e.message}`).join(', ');
      return errorResponse(c, `Validation error: ${message}`, 400);
    }

    if (error instanceof Error) {
      return errorResponse(
        c,
        env.NODE_ENV === 'development' ? error.message : 'Internal server error',
        500
      );
    }

    return errorResponse(c, 'Internal server error', 500);
  }
});
