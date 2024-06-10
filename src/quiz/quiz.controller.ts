import { Controller, Get, Post, Param, ParseIntPipe } from '@nestjs/common';
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

  @Post(':id/increment-yes')
  async incrementYes(@Param('id', ParseIntPipe) id: number) {
    return this.quizService.incrementYes(id);
  }

  @Post(':id/increment-no')
  async incrementNo(@Param('id', ParseIntPipe) id: number) {
    return this.quizService.incrementNo(id);
  }
}
