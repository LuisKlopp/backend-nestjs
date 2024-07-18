import { Controller, Get, Param } from '@nestjs/common';
import { HistoryUserService } from './history-user.service';
import { HistoryUserAnswer } from './entities/history-user-answer.entity';
import { HistoryUser } from './entities/history-user.entity';

@Controller('history-user')
export class HistoryUserController {
  constructor(private readonly historyUserService: HistoryUserService) {}

  @Get(':id/messages')
  async getUserMessages(@Param('id') id: number): Promise<HistoryUserAnswer[]> {
    return this.historyUserService.getUserMessages(id);
  }

  @Get()
  async getAllUsers(): Promise<HistoryUser[]> {
    return this.historyUserService.getAllUsers();
  }
}
