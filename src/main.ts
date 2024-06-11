import express from 'express';

import { env } from './env';
import { requireAuthorization } from './middlewares/auth.middleware';
import { errorHandler } from './middlewares/error-handler.middleware';
import { notFoundHandler } from './middlewares/not-found.middleware';
import userRoutes from './routes/user.routes';
import prisma from './services/prisma-adapter';

const app = express();

app.use(express.json());
app.use('/api', requireAuthorization, userRoutes);
app.use(notFoundHandler);
app.use(errorHandler);

app.listen(env.PORT, () => {
  console.log(`Server is running on port ${env.PORT}`);
});

process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit();
});
