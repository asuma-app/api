import { z } from 'zod';

export const urlSchema = z.object({
  url: z.string().url('Invalid URL format'),
});

export const tiktokSchema = urlSchema;
export const youtubeSchema = urlSchema;
export const instagramSchema = urlSchema;
export const facebookSchema = urlSchema;

export const searchSchema = z.object({
  query: z.string().min(1, 'Search query is required'),
  limit: z.string().optional().default('10').transform(Number),
});
