import { z } from 'zod';

export const getUserParamsSchema = z.object({
  id: z.string().uuid(),
});

export type GetUserParams = z.infer<typeof getUserParamsSchema>;
