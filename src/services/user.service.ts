import type { User } from '@prisma/client';

import { BadRequestError, NotFoundError } from '@/errors';
import prisma from '@/services/prisma-adapter';

interface UserData {
  name: string;
  email: string;
  password: string;
}

export const createUser = async (data: UserData): Promise<User> => {
  try {
    const user = await prisma.user.create({ data });
    return user;
  } catch {
    throw new BadRequestError('Failed to create user');
  }
};

export const getUser = async (id: string): Promise<User> => {
  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) {
    throw new NotFoundError('User not found');
  }
  return user;
};
