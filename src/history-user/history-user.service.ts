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

  async getUserMessagesAndInfo(
    generateString: string,
  ): Promise<{ user: HistoryUser; messages: HistoryUserAnswer[] }> {
    const user = await this.historyUserRepository.findOne({
      where: { generateString },
    });

    const messages = await this.historyUserAnswerRepository.find({
      where: { user: { generateString } },
      relations: ['user'],
    });

    return { user, messages };
  }

  async getAllUsers(): Promise<HistoryUser[]> {
    return this.historyUserRepository.find({
      select: ['id', 'nickname', 'gender', 'generateString', 'visitCount'],
    });
  }
}
