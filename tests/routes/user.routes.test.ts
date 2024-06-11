import express from 'express';
import request from 'supertest';

import { createUserHandler, getUserHandler } from '@/controllers/users.controller';
import { errorHandler } from '@/middlewares/error-handler.middleware';
import userRoutes from '@/routes/user.routes';
import * as userService from '@/services/user.service';

jest.mock('@/services/user.service');

jest.mock('@/controllers/users.controller', () => {
  const originalModule = jest.requireActual('@/controllers/users.controller');
  return {
    __esModule: true,
    ...originalModule,
    createUserHandler: jest.fn(originalModule.createUserHandler),
    getUserHandler: jest.fn(originalModule.getUserHandler),
  };
});

const app = express();
app.use(express.json());
app.use('/api', userRoutes);
app.use(errorHandler);

describe('User Routes', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /api/users', () => {
    it('should create a user and return 201', async () => {
      const userInput = { name: 'John', email: 'john@example.com', password: 'password' };
      const userOutput = {
        ...userInput,
        id: '37f4c713-c447-42cb-9392-af2ad5f2271b',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      (userService.createUser as jest.Mock).mockResolvedValue({
        ...userOutput,
        createdAt: new Date(userOutput.createdAt),
        updatedAt: new Date(userOutput.updatedAt),
      });

      (createUserHandler as jest.Mock).mockImplementation(async (req, res) => {
        const createdUser = await userService.createUser(req.body);
        res.status(201).json(createdUser);
      });

      const response = await request(app).post('/api/users').send(userInput);

      expect(response.status).toBe(201);
      expect(response.body).toEqual(userOutput);
      expect(userService.createUser).toHaveBeenCalledWith(userInput);
    });
  });

  describe('GET /api/users/:id', () => {
    it('should get a user and return 200', async () => {
      const userId = '37f4c713-c447-42cb-9392-af2ad5f2271b';
      const user = {
        id: userId,
        name: 'John',
        email: 'john@example.com',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      (userService.getUser as jest.Mock).mockResolvedValue({
        ...user,
        createdAt: new Date(user.createdAt),
        updatedAt: new Date(user.updatedAt),
      });

      (getUserHandler as jest.Mock).mockImplementation(async (req, res) => {
        const foundUser = await userService.getUser(req.params.id);
        res.status(200).json(foundUser);
      });

      const response = await request(app).get(`/api/users/${userId}`);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(user);
      expect(userService.getUser).toHaveBeenCalledWith(userId);
    });
  });
});
