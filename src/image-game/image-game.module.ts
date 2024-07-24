import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImageGame } from './entities/image-game.entity';
import { ImageGameService } from './image-game.service';
import { ImageGameController } from './image-game.controller';
import { HistoryUserModule } from 'src/history-user/history-user.module';
import { Vote } from 'src/vote/entities/vote.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ImageGame, Vote]), HistoryUserModule],
  providers: [ImageGameService],
  controllers: [ImageGameController],
})
export class ImageGameModule {}
