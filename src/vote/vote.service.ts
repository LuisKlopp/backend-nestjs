import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Vote } from './entities/vote.entity';
import { ImageGame } from '../image-game/entities/image-game.entity';
import * as Mutex from 'async-mutex';
import { HistoryUser } from 'src/history-user/entities/history-user.entity';

const mutex = new Mutex.Mutex();

@Injectable()
export class VoteService {
  constructor(
    @InjectRepository(Vote)
    private readonly voteRepository: Repository<Vote>,
    private readonly dataSource: DataSource,
  ) {}

  async vote(userId: number, questionId: number): Promise<Vote> {
    return mutex.runExclusive(async () => {
      return this.dataSource.transaction(async (manager) => {
        const user = await manager.findOne(HistoryUser, {
          where: { id: userId },
        });
        const question = await manager.findOne(ImageGame, {
          where: { id: questionId },
        });

        if (!user || !question) {
          throw new Error('User or Question not found');
        }

        let vote = await manager.findOne(Vote, {
          where: { user, question },
        });

        if (!vote) {
          vote = manager.create(Vote, {
            user,
            question,
            votes: 1,
          });
        } else {
          vote.votes += 1;
        }

        return manager.save(Vote, vote);
      });
    });
  }

  async getVotesForQuestion(questionId: number): Promise<Vote[]> {
    return this.voteRepository.find({
      where: { question: { id: questionId } },
      relations: ['user', 'question'],
    });
  }
}
