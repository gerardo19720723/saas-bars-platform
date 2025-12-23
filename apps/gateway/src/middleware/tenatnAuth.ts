import { verify } from 'jsonwebtoken';
import { JWT_SECRET } from '@saasbars/config';

export const tenantAuthMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Missing token' });
  }

  try {
    const token = authHeader.substring(7);
    const payload = verify(token, JWT_SECRET) as {
      sub: string;
      tenant: string;
      roles: string[];
    };

    req.userId = payload.sub;
    req.tenantId = payload.tenant;
    req.roles = payload.roles;

    // Propaga a llamadas internas
    req.headers['x-tenant-id'] = payload.tenant;
    req.headers['x-request-id'] = req.id; // si usas pino/uuid

    next();
  } catch (e) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};