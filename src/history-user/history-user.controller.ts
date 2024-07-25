import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { HistoryUserService } from './history-user.service';
import { HistoryUser } from './entities/history-user.entity';
import { CreateHistoryAnswerDto } from './dto/create-history-answer.dto';
import { HistoryUserAnswer } from './entities/history-user-answer.entity';

@Controller('history-user')
export class HistoryUserController {
  constructor(private readonly historyUserService: HistoryUserService) {}

  @Get('current-users')
  async getCurrentUsers(): Promise<HistoryUser[]> {
    return this.historyUserService.getCurrentUsers();
  }

  @Get(':generateString/messages')
  async getUserMessagesAndInfo(
    @Param('generateString') generateString: string,
  ): Promise<{ user: any; messages: any[] }> {
    const { user, messages } =
      await this.historyUserService.getUserMessagesAndInfo(generateString);
    return {
      user: {
        id: user.id,
        nickname: user.nickname,
        gender: user.gender,
        generateString: user.generateString,
        visitCount: user.visitCount,
        checkImagePath: user.checkImagePath,
      },
      messages: messages.map((message) => ({
        id: message.id,
        message: message.message,
      })),
    };
  }

  @Get()
  async getAllUsers(): Promise<HistoryUser[]> {
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
