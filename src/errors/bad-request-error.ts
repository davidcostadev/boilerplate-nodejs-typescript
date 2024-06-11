import { AppError } from './app-error';

export class BadRequestError extends AppError {
  public constructor(message: string = 'Bad Request') {
    super(message, 400);

    this.name = 'BadRequestError';
  }
}
