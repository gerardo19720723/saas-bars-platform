import { NatsConnection } from 'nats';
export declare function connectNats(url: string): Promise<NatsConnection>;
export declare const TOPICS: {
    readonly AUTH_USER_CREATED: "auth.user.created";
};
