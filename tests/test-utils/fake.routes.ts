import { Router } from 'express';

import { FakeController } from './fake.controller';

const router = Router();
const fakeController = new FakeController();

router.get('/error/:type', fakeController.triggerError);

export default router;
