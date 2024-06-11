import type { Request, Response } from 'express';
import { type MockResponse, createRequest, createResponse } from 'node-mocks-http';

export const mockRequest = (body: any = {}, params: any = {}, query: any = {}): Request => {
  return createRequest({ body, params, query });
};

export const mockResponse = (): MockResponse<Response> => {
  return createResponse<Response>();
};

export const mockNext = (): jest.Mock => jest.fn();
