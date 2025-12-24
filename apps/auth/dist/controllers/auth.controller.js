import { z } from 'zod';
const loginSchema = z.object({
    email: z.string().email(),
    password: z.string(),
    tenantId: z.string(),
});
export async function registerHandler(req, rep) {
    const { email, password, tenantId } = registerSchema.parse(req.body);
    return rep.status(201).send({ message: 'User registered (mock)' });
}
export async function loginHandler(req, rep) {
    const { email, password, tenantId } = loginSchema.parse(req.body);
    // ✅ Verifica que req.jwt exista (para debugging)
    if (!req.jwt) {
        console.error('JWT plugin not available in request context');
        return rep.status(500).send({ error: 'JWT not loaded' });
    }
    const token = await req.jwt.sign({
        sub: 'mock_user_id',
        tenant: tenantId,
        roles: ['user'],
    }, { expiresIn: '1h' });
    return rep.send({ token, tenant: tenantId });
}
//# sourceMappingURL=auth.controller.js.map