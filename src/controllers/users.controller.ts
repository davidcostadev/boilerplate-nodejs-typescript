import type { NextFunction, Request, Response } from 'express';

import { createUserSchema } from '@/schemas/create-user.schema';
import { getUserParamsSchema } from '@/schemas/get-user.schema';
import { createUser, getUser } from '@/services/user.service';

export const createUserHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const createUserInput = createUserSchema.parse(req.body);
    const user = await createUser(createUserInput);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

export const getUserHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const params = getUserParamsSchema.parse(req.params);
    const user = await getUser(params.id);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};
