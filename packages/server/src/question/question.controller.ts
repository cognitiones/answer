import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { QuestionService } from './question.service';
import { FindOneDto } from './dto/question.dto';

@Controller('question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Post('init')
  async init() {
    return await this.questionService.init();
  }

  @Get('findOne')
  async findOne(@Query() params: FindOneDto) {
    return await this.questionService.findOne(params);
  }

  @Get('findAll')
  async findAll() {
    return await this.questionService.findAll();
  }
}
