import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HistoryUser } from './entities/history-user.entity';
import { HistoryUserAnswer } from './entities/history-user-answer.entity';
import { CreateHistoryAnswerDto } from './dto/create-history-answer.dto';

import { Mutex } from 'async-mutex';

const mutex = new Mutex();

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

  async findAll(): Promise<HistoryUser[]> {
    return this.historyUserRepository.find();
  }

  async findOne(id: number): Promise<HistoryUser> {
    const user = await this.historyUserRepository.findOne({ where: { id } });
    return user;
  }

  async addAnswer(
    id: number,
    createHistoryAnswerDto: CreateHistoryAnswerDto,
  ): Promise<HistoryUserAnswer> {
    return await mutex.runExclusive(async () => {
      const user = await this.findOne(id);
      const answer = new HistoryUserAnswer();
      answer.message = createHistoryAnswerDto.message;
      answer.font = createHistoryAnswerDto.font;
      answer.user = user;
      return await this.historyUserAnswerRepository.save(answer);
    });
  }

  async getCurrentUsers(): Promise<HistoryUser[]> {
    return this.historyUserRepository.find({
      where: { isCurrentUser: 1 },
    });
  }
}
