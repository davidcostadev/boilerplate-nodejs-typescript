import { Router } from 'express';

import { createUserHandler, getUserHandler } from '@/controllers/users.controller';

const router = Router();

router.post('/users', createUserHandler);
router.get('/users/:id', getUserHandler);

export default router;
