// apps/auth/src/types/fastify.d.ts
import '@fastify/jwt';

declare module 'fastify' {
  interface FastifyInstance {
    // Ya está cubierto por @fastify/jwt
  }
  interface FastifyRequest {
    jwt: any; // o tipado completo si lo prefieres
  }
}