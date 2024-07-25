import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateHistoryAnswerDto } from 'src/history-user/dto/create-history-answer.dto';
import { HistoryUser } from 'src/history-user/entities/history-user.entity';
import { HistoryUserAnswer } from 'src/history-user/entities/history-user-answer.entity';
import { Mutex } from 'async-mutex';

const mutex = new Mutex();

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(HistoryUser)
    private readonly historyUserRepository: Repository<HistoryUser>,
    @InjectRepository(HistoryUserAnswer)
    private readonly historyUserAnswerRepository: Repository<HistoryUserAnswer>,
  ) {}

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
      answer.user = user;
      return await this.historyUserAnswerRepository.save(answer);
    });
  }
}
