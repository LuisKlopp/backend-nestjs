import { Controller, Get, Param } from '@nestjs/common';
import { HistoryUserService } from './history-user.service';
import { HistoryUser } from './entities/history-user.entity';

@Controller('history-user')
export class HistoryUserController {
  constructor(private readonly historyUserService: HistoryUserService) {}

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
    return this.historyUserService.getAllUsers();
  }
}
