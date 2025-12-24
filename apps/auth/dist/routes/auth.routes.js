import { registerHandler, loginHandler } from '../controllers/auth.controller';
export default async function authRoutes(fastify) {
    fastify.post('/register', registerHandler);
    fastify.post('/login', loginHandler);
}
