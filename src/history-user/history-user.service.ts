import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HistoryUser } from './entities/history-user.entity';
import { HistoryUserAnswer } from './entities/history-user-answer.entity';

@Injectable()
export class HistoryUserService {
  constructor(
    @InjectRepository(HistoryUser)
    private readonly historyUserRepository: Repository<HistoryUser>,
    @InjectRepository(HistoryUserAnswer)
    private readonly historyUserAnswerRepository: Repository<HistoryUserAnswer>,
  ) {}

  async getUserMessages(userId: number): Promise<HistoryUserAnswer[]> {
    return this.historyUserAnswerRepository.find({
      where: { user: { id: userId } },
      relations: ['user'],
    });
  }

  async getAllUsers(): Promise<HistoryUser[]> {
    return this.historyUserRepository.find({
      select: ['id', 'nickname', 'gender'],
    });
  }
}
