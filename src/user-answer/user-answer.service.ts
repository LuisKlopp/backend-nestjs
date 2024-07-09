import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserAnswer } from './entities/user-answer.entity';

@Injectable()
export class UserAnswerService {
  constructor(
    @InjectRepository(UserAnswer)
    private readonly userAnswerRepository: Repository<UserAnswer>,
  ) {}

  async findOne(id: number): Promise<UserAnswer> {
    const answer = await this.userAnswerRepository.findOne({ where: { id } });
    if (!answer) {
      throw new NotFoundException(`Answer with ID ${id} not found`);
    }
    return answer;
  }

  async findByUserId(userId: number): Promise<UserAnswer[]> {
    return this.userAnswerRepository.find({ where: { user: { id: userId } } });
  }
}
