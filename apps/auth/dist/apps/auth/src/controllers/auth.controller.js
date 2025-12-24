import { z } from 'zod';
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
    return rep.status(201).send({ message: 'User registered (mock)' });
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