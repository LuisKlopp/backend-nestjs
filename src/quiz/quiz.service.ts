import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Quiz } from './entities/quiz.entity';

@Injectable()
export class QuizService {
  constructor(
    @InjectRepository(Quiz)
    private quizRepository: Repository<Quiz>,
  ) {}

  async getQuiz(): Promise<Quiz[]> {
    return this.quizRepository.find();
  }

  async getQuizById(id: number): Promise<Quiz> {
    const quiz = await this.quizRepository.findOne({ where: { id } });
    if (!quiz) {
      throw new NotFoundException('Quiz not found');
    }
    quiz.isClicked = true;
    await this.quizRepository.save(quiz);
    return quiz;
  }

  async incrementYes(id: number): Promise<Quiz> {
    const quiz = await this.getQuizById(id);
    quiz.yes += 1;
    return this.quizRepository.save(quiz);
  }

  async incrementNo(id: number): Promise<Quiz> {
    const quiz = await this.getQuizById(id);
    quiz.no += 1;
    return this.quizRepository.save(quiz);
  }
}
