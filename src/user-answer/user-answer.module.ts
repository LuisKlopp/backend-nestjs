import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserAnswer } from './entities/user-answer.entity';
import { UserAnswerService } from './user-answer.service';
import { UserAnswerController } from './user-answer.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserAnswer])],
  providers: [UserAnswerService],
  controllers: [UserAnswerController],
})
export class UserAnswerModule {}
