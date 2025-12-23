import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { PrismaClient } from '@saasbars/db';
import { hash, verify } from 'argon2';
import { TOPICS } from '@saasbars/messaging';
import { AuthUserCreatedEvent } from '@saasbars/types';

const prisma = new PrismaClient();

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  tenantId: z.string().min(1),
});

export const registerHandler = async (req: FastifyRequest, rep: FastifyReply) => {
  const { email, password, tenantId } = registerZod.parse(req.body);

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) return rep.status(409).send({ error: 'User already exists' });

  const hashed = await hash(password);
  const user = await prisma.user.create({
    data: {
      email,
      password: hashed,
      tenantId,
      roles: { create: { name: 'user', tenantId } },
    },
  });

  // Emitir evento
  const payload: AuthUserCreatedEvent = {
    userId: user.id,
    email: user.email,
    tenantId: user.tenantId,
  };
  req.server.nats.publish(TOPICS.AUTH_USER_CREATED, JSON.stringify(payload));

  return rep.status(201).send({ userId: user.id });
};

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
  tenantId: z.string(),
});

export const loginHandler = async (req: FastifyRequest, rep: FastifyReply) => {
  const { email, password, tenantId } = loginSchema.parse(req.body);

  const user = await prisma.user.findFirst({
    where: { email, tenantId },
  });
  if (!user) return rep.status(401).send({ error: 'Invalid credentials' });

  const valid = await verify(user.password, password);
  if (!valid) return rep.status(401).send({ error: 'Invalid credentials' });

  const token = fastify.jwt.sign(
    {
      sub: user.id,
      tenant: user.tenantId,
      roles: ['user'], // o cargar desde roles relacionados
    },
    { expiresIn: '1h' }
  );

  return rep.send({ token, tenant: user.tenantId });
};