import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { HistoryUserService } from 'src/history-user/history-user.service';
import { HistoryUser } from 'src/history-user/entities/history-user.entity';
import { CreateHistoryAnswerDto } from 'src/history-user/dto/create-history-answer.dto';
import { HistoryUserAnswer } from 'src/history-user/entities/history-user-answer.entity';

@Controller('users')
export class UserController {
  constructor(private readonly historyUserService: HistoryUserService) {}

  @Get()
  async findAll(): Promise<HistoryUser[]> {
    return this.historyUserService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<HistoryUser> {
    return this.historyUserService.findOne(id);
  }

  @Post(':id/answers')
  async addAnswer(
    @Param('id') id: number,
    @Body() createHistoryAnswerDto: CreateHistoryAnswerDto,
  ): Promise<HistoryUserAnswer> {
    return this.historyUserService.addAnswer(id, createHistoryAnswerDto);
  }
}
