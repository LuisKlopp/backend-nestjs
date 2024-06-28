import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vote } from './entities/vote.entity';
import { User } from '../users/entities/users.entity';
import { ImageGame } from '../image-game/entities/image-game.entity';
@Injectable()
export class VoteService {
  constructor(
    @InjectRepository(Vote)
    private readonly voteRepository: Repository<Vote>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(ImageGame)
    private readonly questionRepository: Repository<ImageGame>,
  ) {}

  async vote(userId: number, questionId: number): Promise<Vote> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    const question = await this.questionRepository.findOne({
      where: { id: questionId },
    });

    if (!user || !question) {
      throw new Error('User or Question not found');
    }

    let vote = await this.voteRepository.findOne({
      where: { user, question },
    });

    if (!vote) {
      vote = this.voteRepository.create({
        user,
        question,
        votes: 1,
      });
    } else {
      vote.votes += 1;
    }

    return this.voteRepository.save(vote);
  }

  async getVotesForQuestion(questionId: number): Promise<Vote[]> {
    return this.voteRepository.find({
      where: { id: questionId },
      relations: ['user', 'question'],
    });
  }
}
