// src/user/user.controller.ts
import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { UserService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get(':nickname')
  async findOne(@Param('nickname') nickname: string) {
    return this.userService.findOne(nickname);
  }
}
