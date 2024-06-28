import { Controller, Post, Param, ParseIntPipe, Get } from '@nestjs/common';
import { VoteService } from './vote.service';
import { Vote } from './entities/vote.entity';

@Controller('votes')
export class VoteController {
  constructor(private readonly voteService: VoteService) {}

  @Post(':userId/:questionId')
  async vote(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('questionId', ParseIntPipe) questionId: number,
  ): Promise<Vote> {
    return this.voteService.vote(userId, questionId);
  }

  @Get(':questionId')
  async getVotes(
    @Param('questionId', ParseIntPipe) questionId: number,
  ): Promise<Vote[]> {
    return this.voteService.getVotesForQuestion(questionId);
  }
}
