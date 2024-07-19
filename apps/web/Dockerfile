FROM node

WORKDIR /app

# 复制所有项目文件
COPY . .

# 安装依赖
RUN npm install --registry=https://registry.npmmirror.com

# 构建应用
RUN npm run build

EXPOSE 3000

# 启动应用
CMD ["npm", "run", "start"]
