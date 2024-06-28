import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vote } from './entities/vote.entity';
import { User } from '../users/entities/users.entity';
import { ImageGame } from '../image-game/entities/image-game.entity';
import { VoteService } from './vote.service';
import { VoteController } from './vote.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Vote, User, ImageGame])],
  providers: [VoteService],
  controllers: [VoteController],
})
export class VoteModule {}
