// apps/auth/src/types/fastify.d.ts
import '@fastify/jwt';

declare module 'fastify' {
  interface FastifyRequest {
    jwt: {
      sign: (payload: any, options?: any) => Promise<string>;
      verify: (token: string) => Promise<any>;
    };
  }
}