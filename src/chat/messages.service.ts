import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from './entities/message.entity';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private messagesRepository: Repository<Message>,
  ) {}

  async saveMessage(
    room_id: string,
    sender_id: string,
    message: string,
  ): Promise<Message> {
    const newMessage = this.messagesRepository.create({
      room_id,
      sender_id,
      message,
    });
    return this.messagesRepository.save(newMessage);
  }

  async findMessagesByRoom(room_id: string): Promise<Message[]> {
    return this.messagesRepository.find({ where: { room_id } });
  }
}
