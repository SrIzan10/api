# Build stage
FROM node:20.15.1-alpine3.20 AS build

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn

COPY . .
RUN yarn build

# Final stage
FROM node:20.15.1-alpine3.20 AS final

WORKDIR /app

COPY --from=build /app/dist ./dist
COPY --from=build /app/prisma ./prisma
COPY --from=build /app/public ./public
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./package.json

CMD ["node", "dist/index.js"]