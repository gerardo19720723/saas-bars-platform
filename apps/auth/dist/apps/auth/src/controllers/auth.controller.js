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
export async function registerHandler(req, rep) {
    const { email, password, tenantId } = registerSchema.parse(req.body);
    // ✅ Publica evento en NATS
    const nats = req.server.nats; // Accede a la conexión NATS
    await nats.publish(TOPICS.AUTH_USER_CREATED, JSON.stringify({
        userId: 'mock_user_id',
        email,
        tenantId,
        timestamp: new Date().toISOString(),
    }));
    return rep.status(201).send({ message: 'User registered', tenantId });
}
export async function loginHandler(req, rep) {
    const { email, password, tenantId } = loginSchema.parse(req.body);
    const token = await req.jwt.sign({
        sub: 'mock_user_id',
        tenant: tenantId,
        roles: ['user'],
    }, { expiresIn: '1h' });
    return rep.send({ token, tenant: tenantId });
}
//# sourceMappingURL=auth.controller.js.map