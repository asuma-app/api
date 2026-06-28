import { Context } from 'hono';
import { ApiResponse } from '../types';
import { StatusCode } from 'hono/utils/http-status';

export const successResponse = <T>(
  c: Context,
  data: T,
  status: StatusCode = 200
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
  status: StatusCode = 500
): Response => {
  const response: ApiResponse = {
    success: false,
    error,
    timestamp: new Date().toISOString(),
    path: c.req.path,
  };
  return c.json(response, status);
};
