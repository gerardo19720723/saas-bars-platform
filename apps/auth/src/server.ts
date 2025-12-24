// apps/auth/src/server.ts
import 'dotenv/config';
import Fastify from 'fastify';
import { AuthConfig } from '@saasbars/config';
import { connectNats } from '@saasbars/messaging';
import authRoutes from './routes/auth.routes.js';

const config = AuthConfig.parse(process.env);

const fastify = Fastify({
  logger: true,
});

// Registra JWT directamente con la clave
await fastify.register(import('@fastify/jwt'), {
  secret: config.JWT_SECRET,
});

// Conecta NATS
const nats = await connectNats(config.NATS_URL);
fastify.decorate('nats', nats);

// Registra rutas
await fastify.register(authRoutes, { prefix: '/api/auth' });

// Inicia
const start = async () => {
  try {
    await fastify.listen({ port: config.AUTH_PORT, host: '0.0.0.0' });
  } catch (err) {
    console.error('Server start error:', err);
    process.exit(1);
  }
};

process.on('SIGINT', async () => {
  await fastify.close();
  await nats.close();
  process.exit(0);
});

start();