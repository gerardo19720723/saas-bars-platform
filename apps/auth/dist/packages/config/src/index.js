// packages/config/src/index.ts
import { z } from 'zod';
export const AuthConfig = z.object({
    AUTH_PORT: z.coerce.number().default(3001),
    JWT_SECRET: z.string().min(32),
    DATABASE_URL: z.string().url(),
    NATS_URL: z.string().default('nats://localhost:4222'),
});
