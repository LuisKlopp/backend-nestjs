import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HistoryUserService } from 'src/history-user/history-user.service';
import { HistoryUserController } from 'src/history-user/history-user.controller';
import { HistoryUser } from 'src/history-user/entities/history-user.entity';
import { HistoryUserAnswer } from 'src/history-user/entities/history-user-answer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([HistoryUser, HistoryUserAnswer])],
  providers: [HistoryUserService],
  controllers: [HistoryUserController],
  exports: [HistoryUserService],
})
export class UserModule {}
