import { Context } from 'hono';
import { ApiResponse } from '../types';

export const successResponse = <T>(
  c: Context,
  data: T,
  status: number = 200
): Response => {
  const response: ApiResponse<T> = {
    success: true,
    data,
    timestamp: new Date().toISOString(),
    path: c.req.path,
  };
  return c.json(response, status);
};

export const errorResponse = (
  c: Context,
  error: string,
  status: number = 500
): Response => {
  const response: ApiResponse = {
    success: false,
    error,
    timestamp: new Date().toISOString(),
    path: c.req.path,
  };
  return c.json(response, status);
};
