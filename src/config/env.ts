import { z } from 'zod';

const envSchema = z.object({
  PORT: z.string().default('3000'),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  RATE_LIMIT_MAX: z.string().default('100'),
  RATE_LIMIT_WINDOW_MS: z.string().default('60000'),
  CORS_ORIGIN: z.string().default('*'),
  LOG_LEVEL: z.enum(['debug', 'info', 'warn', 'error']).default('info'),
  TIKTOK_API_KEY: z.string().optional(),
  YOUTUBE_API_KEY: z.string().optional(),
  INSTAGRAM_API_KEY: z.string().optional(),
  FACEBOOK_API_KEY: z.string().optional(),
});

export const env = envSchema.parse(process.env);
