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

export const registerHandler = async (req: FastifyRequest, rep: FastifyReply) => {
  const { email, password, tenantId } = registerSchema.parse(req.body);
  console.log('📡 Evento simulado:', TOPICS.AUTH_USER_CREATED, { email, tenantId });
  return rep.status(201).send({ message: 'User registered (mock)' });
};

export const loginHandler = async (req: FastifyRequest, rep: FastifyReply) => {
  const { email, password, tenantId } = loginSchema.parse(req.body);
  const token = await req.jwt.sign(
    { sub: 'mock_user_id', tenant: tenantId, roles: ['user'] },
    { expiresIn: '1h' }
  );
  return rep.send({ token, tenant: tenantId });
};