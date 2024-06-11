import { z } from 'zod';

// ref: https://sdorra.dev/posts/2023-08-22-type-safe-environment
const schema = z.object({
  DATABASE_URL: z.string(),
  PORT: z.coerce.number().int().positive(),
});

export const parsed = schema.safeParse(process.env);

if (!parsed.success) {
  throw new Error('❌ Invalid environment variables: ' + JSON.stringify(parsed.error.format(), null, 4));
}

export const env = parsed.data;
