import { BadRequestError, NotFoundError } from '@/errors';
import prisma from '@/services/prisma-adapter';
import { createUser, getUser } from '@/services/user.service';

jest.mock('@/services/prisma-adapter', () => ({
  __esModule: true,
  default: {
    user: {
      create: jest.fn(),
      findUnique: jest.fn(),
    },
  },
}));

describe('UserService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createUser', () => {
    it('should create a user', async () => {
      const userInput = { name: 'John', email: 'john@example.com', password: 'password' };
      const userOutput = {
        ...userInput,
        id: '37f4c713-c447-42cb-9392-af2ad5f2271b',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      (prisma.user.create as jest.Mock).mockResolvedValue(userOutput);

      const result = await createUser(userInput);

      expect(prisma.user.create).toHaveBeenCalledWith({ data: userInput });
      expect(result).toEqual(userOutput);
    });

    it('should throw BadRequestError if user creation fails', async () => {
      const userInput = { name: 'John', email: 'john@example.com', password: 'password' };

      (prisma.user.create as jest.Mock).mockRejectedValue(new Error('Failed'));

      await expect(createUser(userInput)).rejects.toThrow(BadRequestError);
    });
  });

  describe('getUser', () => {
    it('should get a user', async () => {
      const userId = '37f4c713-c447-42cb-9392-af2ad5f2271b';
      const user = {
        id: userId,
        name: 'John',
        email: 'john@example.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      (prisma.user.findUnique as jest.Mock).mockResolvedValue(user);

      const result = await getUser(userId);

      expect(prisma.user.findUnique).toHaveBeenCalledWith({ where: { id: userId } });
      expect(result).toEqual(user);
    });

    it('should throw NotFoundError if user not found', async () => {
      const userId = '37f4c713-c447-42cb-9392-af2ad5f2271b';

      (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);

      await expect(getUser(userId)).rejects.toThrow(NotFoundError);
    });
  });
});
