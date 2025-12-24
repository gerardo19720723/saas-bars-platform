export default async function jwtPlugin(fastify) {
    await fastify.register(import('@fastify/jwt'), {
        secret: fastify.config.JWT_SECRET, // lo pasaremos más adelante
    });
}
