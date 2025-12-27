# apps/auth/Dockerfile
FROM node:20-alpine

WORKDIR /app

# Copia TODO excepto node_modules (gracias a .dockerignore)
COPY . .

# Instala TODAS las dependencias (sin --prod, para tener tsc)
RUN CI=true npm install -g pnpm && \
    CI=true pnpm install && \
    CI=true pnpm run -C apps/auth build

EXPOSE 3001
CMD ["node", "apps/auth/dist/server.js"]