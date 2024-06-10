// src/quiz/quiz.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Quiz } from './entities/quiz.entity';
import { Answer } from './entities/answer.entity';

@Injectable()
export class QuizService {
  constructor(
    @InjectRepository(Quiz)
    private quizRepository: Repository<Quiz>,
    @InjectRepository(Answer)
    private answerRepository: Repository<Answer>,
  ) {}

  async getQuiz(): Promise<Quiz[]> {
    return this.quizRepository.find();
  }

  async getQuizById(id: number): Promise<Quiz> {
    return this.quizRepository.findOne({ where: { id } });
  }

  async saveAnswer(quizId: number, choice: string): Promise<Answer> {
    const answer = new Answer();
    answer.quizId = quizId;
    answer.choice = choice;
    return this.answerRepository.save(answer);
  }

  async getResults(quizId: number): Promise<any> {
    const results = await this.answerRepository.find({ where: { quizId } });
    const counts = results.reduce(
      (acc, answer) => {
        acc[answer.choice] += 1;
        return acc;
      },
      { O: 0, X: 0 },
    );
    return counts;
  }
}
