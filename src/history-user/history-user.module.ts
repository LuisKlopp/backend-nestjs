import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HistoryUser } from './entities/history-user.entity';
import { HistoryUserAnswer } from './entities/history-user-answer.entity';
import { HistoryUserService } from './history-user.service';
import { HistoryUserController } from './history-user.controller';

@Module({
  imports: [TypeOrmModule.forFeature([HistoryUser, HistoryUserAnswer])],
  providers: [HistoryUserService],
  controllers: [HistoryUserController],
})
export class HistoryUserModule {}
