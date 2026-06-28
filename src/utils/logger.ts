import pino from 'pino';
import { env } from '../config/env';

export const logger = pino({
  level: env.LOG_LEVEL,
  timestamp: pino.stdTimeFunctions.isoTime,
  transport:
    env.NODE_ENV === 'development'
      ? {
          target: 'pino-pretty',
          options: {
            colorize: true,
            translateTime: true,
            ignore: 'pid,hostname',
          },
        }
      : undefined,
});
