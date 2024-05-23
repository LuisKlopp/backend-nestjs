import { Controller, Get, Param } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { Message } from './entities/message.entity';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Get(':room_id')
  async findMessagesByRoom(
    @Param('room_id') room_id: string,
  ): Promise<Message[]> {
    return this.messagesService.findMessagesByRoom(room_id);
  }
}
