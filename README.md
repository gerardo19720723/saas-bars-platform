# Auth Service — `@saasbars/auth`

Microservicio de autenticación y autorización para **saas-bars-platform**.

## 🔑 Responsabilidades
- Registro y login de usuarios
- Emisión y validación de JWT con claims: `sub`, `tenant`, `roles`
- Gestión multitenant mediante campo `tenantId`
- Emisión del evento `auth.user.created` vía NATS al registrar un usuario

## 🧪 Endpoints
| Método | Ruta               | Descripción            |
|--------|--------------------|------------------------|
| POST   | `/api/auth/register` | Registra nuevo usuario |
| POST   | `/api/auth/login`    | Obtiene JWT            |

**Body (register/login):**
```json
{
  "email": "user@bar.com",
  "password": "secure123!",
  "tenantId": "bar_abc123"
}