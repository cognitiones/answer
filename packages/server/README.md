## Nest 
### 1、生成模块
nest g resource xxx

## Prisma

### 1、数据库迁移
npx prisma migrate dev

### 2、更新 Prisma Client
npx prisma generate

### 3、验证更新
npx prisma studio

## Docker

关闭容器：
docker-compose down --rmi all

启动容器：
docker-compose up

## 疑问

1、显式/隐式关联表
2、级联/关联删除
3、数据库存时间 存 DateTime 还是 string (后者 2024/2/24 12:00:00 这种)
4、定时任务 （每分钟扫表？）
