import { z } from 'zod';
export declare const AuthConfig: z.ZodObject<{
    AUTH_PORT: z.ZodDefault<z.ZodNumber>;
    JWT_SECRET: z.ZodString;
    DATABASE_URL: z.ZodString;
    NATS_URL: z.ZodDefault<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    AUTH_PORT: number;
    JWT_SECRET: string;
    DATABASE_URL: string;
    NATS_URL: string;
}, {
    JWT_SECRET: string;
    DATABASE_URL: string;
    AUTH_PORT?: number | undefined;
    NATS_URL?: string | undefined;
}>;
