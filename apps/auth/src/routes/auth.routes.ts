import { FastifyInstance } from 'fastify';
import { registerHandler, loginHandler } from '../controllers/auth.controller.js';

export default async function authRoutes(fastify: FastifyInstance) {
  fastify.post('/register', registerHandler);
  fastify.post('/login', loginHandler);
}