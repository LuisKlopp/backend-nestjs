import { Controller, Get, Param } from '@nestjs/common';
import { UserAnswerService } from './user-answer.service';
import { UserAnswer } from './entities/user-answer.entity';

@Controller('user-answers')
export class UserAnswerController {
  constructor(private readonly userAnswerService: UserAnswerService) {}

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<UserAnswer> {
    return this.userAnswerService.findOne(id);
  }

  @Get('user/:userId')
  async findByUserId(@Param('userId') userId: number): Promise<UserAnswer[]> {
    return this.userAnswerService.findByUserId(userId);
  }
}
