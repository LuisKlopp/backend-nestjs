import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { QuizService } from './quiz.service';

@Controller('quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Get()
  async getQuiz() {
    return this.quizService.getQuiz();
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
