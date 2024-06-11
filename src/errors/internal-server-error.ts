import { AppError } from './app-error';

export class InternalServerError extends AppError {
  public constructor(message: string = 'Internal Server Error') {
    super(message, 500);

    this.name = 'InternalServerError';
  }
}
