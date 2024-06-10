import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { QuizService } from './quiz.service';

@Controller('quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Get()
  async getQuiz() {
    return this.quizService.getQuiz();
  }

  @Get(':id')
  async getQuizById(@Param('id', ParseIntPipe) id: number) {
    return this.quizService.getQuizById(id);
  }

  @Post(':quizId/answer')
  async saveAnswer(
    @Param('quizId') quizId: number,
    @Body('choice') choice: string,
  ) {
    return this.quizService.saveAnswer(quizId, choice);
  }

  @Get(':quizId/results')
  async getResults(@Param('quizId') quizId: number) {
    return this.quizService.getResults(quizId);
  }
}
