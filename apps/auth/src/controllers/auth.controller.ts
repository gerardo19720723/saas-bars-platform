// apps/auth/src/controllers/auth.controller.ts
import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { TOPICS } from '@saasbars/messaging';

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  tenantId: z.string().min(1),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
  tenantId: z.string(),
});

export async function registerHandler(req: FastifyRequest, rep: FastifyReply) {
  const { email, password, tenantId } = registerSchema.parse(req.body);
}

export async function loginHandler(req: FastifyRequest, rep: FastifyReply) {
  const { email, password, tenantId } = loginSchema.parse(req.body);
  const token = await req.jwt.sign({
    sub: 'mock_user_id',
    tenant: tenantId,
    roles: ['user'],
  }, { expiresIn: '1h' });
  return rep.send({ token, tenant: tenantId });
}