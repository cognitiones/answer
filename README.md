# 答题系统

1、
```powerShell
pnpm init
```

2、创建工作区
```yaml
新建 pnpm-workspace.yaml 文件
写入以下内容：

packages: 
  - 'apps/**'
  - 'packages/**'
```

3、创建 packages apps 文件夹

4、创建 答题后端系统 nest
```powerShell
nest new server //选择 pnpm
```

5、接入 prisma orm
```powerShell
pnpm install prisma --save-dev

pnpx prisma init
```

6、prisma 连接数据库
```.env
更改 .env 文件

DATABASE_URL="mysql://root:你的密码@localhost:3306/answer"
``` 

修改 schema.prisma 内容
```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}

model User {
  id          Int          @id @default(autoincrement())
  username    String       @unique
  email       String       @unique
  password    String
  submissions Submission[]
}

model Question {
  id          Int          @id @default(autoincrement())
  title       String
  description String
  type        QuestionType
  explanation String
  programming Programming?
  eventloop   Eventloop?
  prototype   Prototype?
  submissions Submission[]
}

model Programming {
  id         Int      @id @default(autoincrement())
  question   Question @relation(fields: [questionId], references: [id])
  questionId Int      @unique
  solution   String
}

model Eventloop {
  id            Int      @id @default(autoincrement())
  question      Question @relation(fields: [questionId], references: [id])
  questionId    Int      @unique
  choices       Choice[]
  correctAnswer String
}

model Prototype {
  id            Int      @id @default(autoincrement())
  question      Question @relation(fields: [questionId], references: [id])
  questionId    Int      @unique
  choices       Choice[]
  correctAnswer String
}

model Choice {
  id          Int        @id @default(autoincrement())
  label       String
  value       String
  eventloop   Eventloop  @relation(fields: [eventloopId], references: [id])
  eventloopId Int
  Prototype   Prototype? @relation(fields: [prototypeId], references: [id])
  prototypeId Int?
}

model Submission {
  id             Int      @id @default(autoincrement())
  question       Question @relation(fields: [questionId], references: [id])
  questionId     Int      @unique
  user           User     @relation(fields: [userId], references: [id])
  userId         Int      @unique
  code           String? // 编程题提交的代码
  answer         String? // 选择题提交的答案
  isCorrect      Boolean
  submissionTime DateTime @default(now())
}

enum QuestionType {
  PROGRAMMING
  EVENTLOOP
  PROTOTYPE
}
```

重置并创建数据
```powerShell
执行前 先创建 answer 数据库

pnpx prisma migrate reset 
pnpx prisma migrate dev --name init
```

## CRUD

创建 prisma 模块

```powerShell
nest g module prisma

nest g service prisma --no-spec
```

prisma service 建立连接 并 设置 log
```ts
//prisma.service.ts
import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from "@prisma/client";

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
    constructor(){
        super({
            log: [
                {
                    emit: 'stdout',
                    level:'query'

                }
            ]
        })
    }

    async onModuleInit() {
        await this.$connect();  
    }
}
```

prisma module 抛出 prisma 服务 并 设置为全局模块
```ts
import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
```

创建 题目模块
```ts
nest g resource question --no-spec
```

题目服务 写一个初始化数据
```ts
import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class QuestionService {
  @Inject(PrismaService)
  private prisma: PrismaService;

  async init() {
    return this.prisma.question.create({
      data: {
        title: 'eventloop 1',
        description: `
                        setTimeout(function() {
            console.log('setTimeout 1');
            new Promise(function(resolve) {
                console.log('promise 1');
                resolve();
            }).then(function() {
                console.log('promise then 1')
            })
        })
        
        async function async1() {
            console.log('async1 start');
            await async2();
            console.log('async1 end');
            await async3();
        }
        
        async function async2() {
            console.log('async2');
            new Promise(function(resolve) {
                console.log('promise 2');
                resolve();
            }).then(function() {
                console.log('promise then 2');
            })
        }
        
        async function async3() {
            console.log('async3');
        }
        
        console.log('eventLoop');
        async1();
        new Promise(function(resolve) {
            console.log('promise 3');
            resolve();
        }).then(function() {
            console.log('promise then 3');
        });
        
        console.log('eventLoop end');
                    `,
        type: 'EVENTLOOP',
        explanation: '解析',
        eventloop: {
          create: {
            correctAnswer: 'eventLoop,async1 start,async2,promise 2,promise 3,eventLoop end,promise then 2,async1 end,async3,promise then 3,setTimeout 1,promise 1,promise then 1',
            choices: {
              createMany: {
                data: [
                  {
                    label: 'eventLoop',
                    value: 'eventLoop',
                  },
                  {
                    label: 'async1 start',
                    value: 'async1 start',
                  },
                  {
                    label: 'async2',
                    value: 'async2',
                  },
                  {
                    label: 'promise 2',
                    value: 'promise 2',
                  },
                  {
                    label: 'promise 3',
                    value: 'promise 3',
                  },
                  {
                    label: 'eventLoop end',
                    value: 'eventLoop end',
                  },
                  {
                    label: 'promise then 2',
                    value: 'promise then 2',
                  },
                  {
                    label: 'async1 end',
                    value: 'async1 end',
                  },
                  {
                    label: 'async3',
                    value: 'async3',
                  },
                  {
                    label: 'promise then 3',
                    value: 'promise then 3',
                  },
                  {
                    label: 'setTimeout 1',
                    value: 'setTimeout 1',
                  },
                  {
                    label: 'promise 1',
                    value: 'promise 1',
                  },
                  {
                    label: "promise then 1",
                    value: "promise then 1"
                  }
                ],
              },
            },
          },
        },
      },
    });
  }
}

```