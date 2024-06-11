import { AppError } from './app-error';

export class NotFoundError extends AppError {
  public constructor(message: string = 'Not Found') {
    super(message, 404);
    this.name = 'NotFoundError';
  }
}
