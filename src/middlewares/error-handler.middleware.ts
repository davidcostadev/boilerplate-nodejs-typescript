import type { Request, Response } from 'express';
import { ZodError } from 'zod';

import { AppError } from '../errors/app-error';
import { InternalServerError } from '../errors/internal-server-error';

export function errorHandler(error: Error, _req: Request, res: Response): void {
  if (error instanceof ZodError) {
    res.status(400).json({
      message: 'Invalid request data',
      errors: error.errors,
    });
  } else if (error instanceof AppError) {
    res.status(error.statusCode).json({ message: error.message });
  } else {
    const internalError = new InternalServerError();
    res.status(internalError.statusCode).json({ message: internalError.message });
  }
}
