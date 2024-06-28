import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImageGame } from './entities/image-game.entity';
import { ImageGameService } from './image-game.service';
import { ImageGameController } from './image-game.controller';
import { UserModule } from 'src/users/users.module';
import { Vote } from 'src/vote/entities/vote.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ImageGame, Vote]), UserModule],
  providers: [ImageGameService],
  controllers: [ImageGameController],
})
export class ImageGameModule {}
