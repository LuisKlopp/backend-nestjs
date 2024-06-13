import {
  Controller,
  Get,
  Post,
  Param,
  ParseIntPipe,
  Body,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { QuestionService } from './question.service';

@Controller('question')
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
  @HttpCode(HttpStatus.NO_CONTENT)
  async addAnswer(
    @Param('id', ParseIntPipe) id: number,
    @Body('answer') answer: string,
  ) {
    await this.questionService.addAnswer(id, answer);
  }
}
