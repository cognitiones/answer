# Build stage
FROM node  as build-stage

WORKDIR /app

COPY package*.json ./

RUN npm config set registry https://registry.npmmirror.com/

RUN npm install

COPY . .
RUN npm i prisma
RUN npx prisma generate && npm run build

# Production stage
FROM node as production-stage

WORKDIR /app

COPY --from=build-stage /app/dist /app/dist
COPY --from=build-stage /app/package.json /app/package.json
COPY --from=build-stage /app/node_modules /app/node_modules
COPY --from=build-stage /app/prisma /app/prisma

RUN npm config set registry https://registry.npmmirror.com/

RUN npm install --production

EXPOSE 3006

# 添加数据库迁移命令
CMD ["sh", "-c", "npx prisma migrate deploy && npm run start:prod"]
