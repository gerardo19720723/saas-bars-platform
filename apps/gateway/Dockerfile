FROM node:lts-alpine AS base
WORKDIR /app
RUN npm install -g pnpm

FROM base AS deps
COPY pnpm-lock.yaml ./
COPY packages packages
COPY apps/gateway/package.json apps/gateway/package.json
RUN pnpm fetch --prod

FROM base AS build
COPY --from=deps /app/node_modules /app/node_modules
COPY . .
RUN pnpm run --filter gateway build

FROM base
COPY --from=build /app/dist/apps/gateway ./dist
COPY --from=build /app/node_modules ./node_modules
COPY apps/auth/package.json ./
ENV NODE_ENV=production
EXPOSE 3001
CMD ["node", "dist/server.js"]