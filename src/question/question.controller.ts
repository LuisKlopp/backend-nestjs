import {
  Controller,
  Get,
  Post,
  Param,
  ParseIntPipe,
  Body,
  HttpStatus,
  HttpCode,
  Logger,
  Patch,
} from '@nestjs/common';
import { QuestionService } from './question.service';

@Controller('question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}
  private readonly logger = new Logger(QuestionController.name);

  @Get()
  async getQuestions() {
    this.logger.log('리스트 API 호출됨');
    return this.questionService.getQuestions();
  }

  @Get(':id')
  async getQuestionById(@Param('id', ParseIntPipe) id: number) {
    this.logger.log('상세페이지 API 호출됨');
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
