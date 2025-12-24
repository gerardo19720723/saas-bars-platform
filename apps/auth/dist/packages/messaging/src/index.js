// packages/messaging/src/index.ts
import { connect } from 'nats';
export async function connectNats(url) {
    return await connect({ servers: url });
}
export const TOPICS = {
    AUTH_USER_CREATED: 'auth.user.created',
};
//# sourceMappingURL=index.js.map