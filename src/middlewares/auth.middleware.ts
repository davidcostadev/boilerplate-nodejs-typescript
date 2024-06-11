import type { NextFunction, Request, Response } from 'express';

export function requireAuthorization(req: Request, res: Response, next: NextFunction): void {
  const token = req.headers.authorization;
  if (token) {
    next();
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
}
