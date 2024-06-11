import { Request } from 'express';

import { FakeService } from './fake.service';

const fakeService = new FakeService();

export class FakeController {
  public async triggerError(req: Request): Promise<void> {
    // @ts-ignore
    console.log({ type: req.params.type });
    // @ts-ignore
    await fakeService.throwError(req.params.type);
  }
}
