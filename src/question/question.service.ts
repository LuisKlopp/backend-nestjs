import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Question } from './entities/question.entity';
import { Answer } from './entities/answer.entity';
import * as Mutex from 'async-mutex';

const mutex = new Mutex.Mutex();

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Question)
    private questionRepository: Repository<Question>,
    @InjectRepository(Answer)
    private answerRepository: Repository<Answer>,
    private readonly dataSource: DataSource,
  ) {}

  async getQuestions(): Promise<Question[]> {
    return this.questionRepository.find({ relations: ['answers'] });
  }

  async getQuestionById(id: number): Promise<Question> {
    const question = await this.questionRepository.findOne({
      where: { id },
      relations: ['answers'],
    });
    if (!question) {
      throw new NotFoundException('Question not found');
    }
    await this.questionRepository.save(question);
    return question;
  }

  async addAnswer(questionId: number, answer: string): Promise<Answer> {
    return await mutex.runExclusive(async () => {
      return await this.dataSource.transaction(async (manager) => {
        const question = await manager.findOne(Question, {
          where: { id: questionId },
        });
        if (!question) {
          throw new Error(`Question with id ${questionId} not found`);
        }
        const newAnswer = manager.create(Answer, {
          answer,
          question,
        });
        return await manager.save(newAnswer);
      });
    });
  }
}
