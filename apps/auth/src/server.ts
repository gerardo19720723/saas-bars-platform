import Fastify from 'fastify';
import { AuthConfig } from '@saasbars/config';
import { connectNats } from '@saasbars/messaging';
import authRoutes from './routes/auth.routes.js';

const config = AuthConfig.parse(process.env);

const fastify = Fastify({
  logger: true,
});

// Plugins
await fastify.register(import('@fastify/jwt'), {
  secret: config.JWT_SECRET,
});

// NATS
const nats = await connectNats(config.NATS_URL);
fastify.decorate('nats', nats);

// Routes
fastify.register(authRoutes, { prefix: '/api/auth' });

// Graceful shutdown
process.on('SIGINT', async () => {
  await fastify.close();
  await nats.close();
  process.exit(0);
});

const start = async () => {
  try {
    await fastify.listen({ port: config.AUTH_PORT, host: '0.0.0.0' });
  } catch (err) {
    console.error('Server start error');
    process.exit(1);
  }
};

start();