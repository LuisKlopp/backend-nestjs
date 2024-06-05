// src/user/user.service.ts
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  private users = [];

  async create(createUserDto: CreateUserDto) {
    const newUser = {
      id: Date.now(),
      ...createUserDto,
    };
    this.users.push(newUser);
    return newUser;
  }

  async findOne(nickname: string) {
    return this.users.find((user) => user.nickname === nickname);
  }
}
