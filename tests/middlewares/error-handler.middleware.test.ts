import { ZodError, type ZodIssue } from 'zod';

import { mockRequest, mockResponse } from '../test-utils/mock-express';

import { BadRequestError, InternalServerError, NotFoundError } from '@/errors';
import { errorHandler } from '@/middlewares/error-handler.middleware';

describe('Error Handler Middleware', () => {
  it('should handle NotFoundError and return 404', () => {
    const req = mockRequest();
    const res = mockResponse();

    const error = new NotFoundError();
    errorHandler(error, req, res);

    expect(res.statusCode).toBe(404);
    expect((res as any)._getJSONData()).toEqual({ message: 'Not Found' });
  });

  it('should handle BadRequestError and return 400', () => {
    const req = mockRequest();
    const res = mockResponse();

    const error = new BadRequestError();
    errorHandler(error, req, res);

    expect(res.statusCode).toBe(400);
    expect((res as any)._getJSONData()).toEqual({ message: 'Bad Request' });
  });

  it('should handle ZodError and return 400', () => {
    const req = mockRequest();
    const res = mockResponse();

    const zodIssues: ZodIssue[] = [
      {
        path: ['field'],
        message: 'Invalid field',
        code: 'invalid_type',
        expected: 'string',
        received: 'number',
      },
    ];
    const error = new ZodError(zodIssues);
    errorHandler(error, req, res);

    expect(res.statusCode).toBe(400);
    expect((res as any)._getJSONData()).toEqual({
      message: 'Invalid request data',
      errors: zodIssues,
    });
  });

  it('should handle generic Error and return 500', () => {
    const req = mockRequest();
    const res = mockResponse();

    const error = new Error('Something went wrong');
    errorHandler(error, req, res);

    expect(res.statusCode).toBe(500);
    expect((res as any)._getJSONData()).toEqual({ message: 'Internal Server Error' });
  });

  it('should handle InternalServerError and return 500', () => {
    // Add this test case
    const req = mockRequest();
    const res = mockResponse();

    const error = new InternalServerError();
    errorHandler(error, req, res);

    expect(res.statusCode).toBe(500);
    expect((res as any)._getJSONData()).toEqual({ message: 'Internal Server Error' });
  });
});
