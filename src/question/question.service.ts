import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Question } from './entities/question.entity';
import { Answer } from './entities/answer.entity';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Question)
    private questionRepository: Repository<Question>,
    @InjectRepository(Answer)
    private answerRepository: Repository<Answer>,
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

  async addAnswer(questionId: number, answer: string) {
    const question = await this.getQuestionById(questionId);
    const newAnswer = this.answerRepository.create({
      answer,
      question,
    });
    await this.answerRepository.save(newAnswer);
  }
}
