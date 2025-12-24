// packages/messaging/src/index.ts
import { connect, NatsConnection } from 'nats';

export async function connectNats(url: string): Promise<NatsConnection> {
  return await connect({ servers: url });
}

export const TOPICS = {
  AUTH_USER_CREATED: 'auth.user.created',
} as const;
