import {
  Controller,
  Get,
  Post,
  Param,
  ParseIntPipe,
  Body,
} from '@nestjs/common';
import { QuestionService } from './question.service';

@Controller('questions')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Get()
  async getQuestions() {
    return this.questionService.getQuestions();
  }

  @Get(':id')
  async getQuestionById(@Param('id', ParseIntPipe) id: number) {
    return this.questionService.getQuestionById(id);
  }

  @Post(':id/answer')
  async addAnswer(
    @Param('id', ParseIntPipe) id: number,
    @Body('answer') answer: string,
  ) {
    return this.questionService.addAnswer(id, answer);
  }
}
