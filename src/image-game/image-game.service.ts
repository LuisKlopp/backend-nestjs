import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ImageGame } from './entities/image-game.entity';
import { UserService } from '../users/users.service';
import { Vote } from '../vote/entities/vote.entity';

@Injectable()
export class ImageGameService {
  constructor(
    @InjectRepository(ImageGame)
    private readonly imageGameRepository: Repository<ImageGame>,
    @InjectRepository(Vote)
    private readonly voteRepository: Repository<Vote>,
    private readonly userService: UserService,
  ) {}

  async findAllQuestions(): Promise<ImageGame[]> {
    return this.imageGameRepository.find();
  }

  async findQuestionWithUsers(
    questionId: number,
  ): Promise<{ question: ImageGame; users: any[] }> {
    const question = await this.imageGameRepository.findOne({
      where: { id: questionId },
    });
    const users = await this.userService.findAll();

    if (!question) {
      throw new Error('Question not found');
    }

    const votes = await this.voteRepository.find({
      where: { question: { id: questionId } },
      relations: ['user'],
    });

    const votesMap = new Map<number, number>();
    votes.forEach((vote) => {
      votesMap.set(vote.user.id, vote.votes);
    });

    const usersWithVotes = users.map((user) => ({
      ...user,
      votes: votesMap.get(user.id) || 0,
    }));

    return { question, users: usersWithVotes };
  }
}
