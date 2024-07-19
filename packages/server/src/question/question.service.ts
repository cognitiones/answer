import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { FindOneDto } from './dto/question.dto';

@Injectable()
export class QuestionService {
  @Inject(PrismaService)
  private prisma: PrismaService;

  async init() {
    return this.prisma.question.create({
      data: {
        title: 'Programming 1',
        description: `
        var array = [1, 123, [123, 213, 22], 11, 1, 3, [4,[5,5,6]]]
        输出扁平化并去重的数组
        `,
        type: 'PROGRAMMING',
        explanation: '解析',
        programming: {
          create: {
            solution: '[1, 123, 213, 22, 11, 3, 4, 5, 6]',
            stem: `var array = [1, 123, [123, 213, 22], 11, 1, 3, [4,[5,5,6]]]
function toSet(arr) {
    return 
}`,
            submitCheck: `return toSet(array);`,
          },
        },
      },
    });

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
            correctAnswer:
              'eventLoop,async1 start,async2,promise 2,promise 3,eventLoop end,promise then 2,async1 end,async3,promise then 3,setTimeout 1,promise 1,promise then 1',
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
                    label: 'promise then 1',
                    value: 'promise then 1',
                  },
                ],
              },
            },
          },
        },
      },
    });
  }

  async findOne(data: FindOneDto) {
    return this.prisma.question.findUnique({
      where: {
        id: data.id,
      },
      include: {
        eventloop: {
          include: {
            choices: true,
          },
        },
        programming: true,
      },
    });
  }

  async findAll() {
    return this.prisma.question.findMany({});
  }
}
