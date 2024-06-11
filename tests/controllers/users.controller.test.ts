import { Request, Response } from 'express';
import { createRequest, createResponse } from 'node-mocks-http';

import { createUserHandler, getUserHandler } from '@/controllers/users.controller';
import { BadRequestError, NotFoundError } from '@/errors';
import { createUser, getUser } from '@/services/user.service';

jest.mock('@/services/user.service');

describe('UserController', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createUserHandler', () => {
    it('should create a user and return 201', async () => {
      const req = createRequest({
        method: 'POST',
        url: '/users',
        body: { name: 'John', email: 'john@example.com', password: 'password' },
      });
      const res = createResponse();
      const next = jest.fn();

      const userOutput = {
        ...req.body,
        id: '123',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      (createUser as jest.Mock).mockResolvedValue({
        ...userOutput,
        createdAt: new Date(userOutput.createdAt),
        updatedAt: new Date(userOutput.updatedAt),
      });

      await createUserHandler(req as Request, res as Response, next);

      res.end(); // Ensure the response is ended to finalize the response data

      expect(res.statusCode).toBe(201);
      expect(res._getJSONData()).toEqual(userOutput);
      expect(createUser).toHaveBeenCalledWith(req.body);
    });

    it('should handle error and call next', async () => {
      const req = createRequest({
        method: 'POST',
        url: '/users',
        body: { name: 'John', email: 'john@example.com', password: 'password' },
      });
      const res = createResponse();
      const next = jest.fn();

      const error = new BadRequestError('Failed to create user');
      (createUser as jest.Mock).mockRejectedValue(error);

      await createUserHandler(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe('getUserHandler', () => {
    it('should get a user and return 200', async () => {
      const req = createRequest({
        method: 'GET',
        url: '/users/34162ac0-b167-419e-9906-0321e803a249',
        params: { id: '34162ac0-b167-419e-9906-0321e803a249' },
      });
      const res = createResponse();
      const next = jest.fn();

      const user = {
        id: '34162ac0-b167-419e-9906-0321e803a249',
        name: 'John',
        email: 'john@example.com',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      (getUser as jest.Mock).mockResolvedValue({
        ...user,
        createdAt: new Date(user.createdAt),
        updatedAt: new Date(user.updatedAt),
      });

      await getUserHandler(req as Request, res as Response, next);

      res.end();

      expect(res.statusCode).toBe(200);
      expect(res._getJSONData()).toEqual(user);
      expect(getUser).toHaveBeenCalledWith('34162ac0-b167-419e-9906-0321e803a249');
    });

    it('should handle error and call next', async () => {
      const req = createRequest({
        method: 'GET',
        url: '/users/34162ac0-b167-419e-9906-0321e803a249',
        params: {
          id: '34162ac0-b167-419e-9906-0321e803a249',
        },
      });
      const res = createResponse();
      const next = jest.fn();

      const error = new NotFoundError('User not found');
      (getUser as jest.Mock).mockRejectedValue(error);

      await getUserHandler(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
