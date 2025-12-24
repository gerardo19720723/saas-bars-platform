import { registerHandler, loginHandler } from '../controllers/auth.controller.js';
export default async function authRoutes(fastify) {
    fastify.post('/register', registerHandler);
    fastify.post('/login', loginHandler);
}
//# sourceMappingURL=auth.routes.js.map