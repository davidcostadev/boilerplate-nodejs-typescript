import { BadRequestError, NotFoundError } from '@/errors';

export class FakeService {
  public throwError(type: string): Promise<void> {
    switch (type) {
      case 'notfound':
        throw new NotFoundError('Not Found');
      case 'badrequest':
        throw new BadRequestError('Bad Request');
      default:
        throw new Error('Unknown Error');
    }
  }
}
