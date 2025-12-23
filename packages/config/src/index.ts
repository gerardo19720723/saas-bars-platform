import { z } from 'zod';

const baseConfig = z.object({
  DATABASE_URL: z.string().url(),
  NATS_URL: z.string(),
  REDIS_URL: z.string(),
  JWT_SECRET: z.string().length(32), // como prefieres
});

// Por servicio
export const AuthConfig = baseConfig.extend({
  AUTH_PORT: z.coerce.number().default(3001),
});

export const CatalogConfig = baseConfig.extend({
  CATALOG_PORT: z.coerce.number().default(3002),
});

// Usa en cada app así:
// const config = AuthConfig.parse(process.env);