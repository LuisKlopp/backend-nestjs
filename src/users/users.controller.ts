import { Controller, Post, Body, Get, Param, Patch } from '@nestjs/common';
import { UserService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/users.entity';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UserAnswer } from './entities/user-answer.entity';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<User> {
    return this.userService.findOne(id);
  }

  @Patch(':id/answers')
  async addAnswer(
    @Param('id') id: number,
    @Body() createAnswerDto: CreateAnswerDto,
  ): Promise<UserAnswer> {
    return this.userService.addAnswer(id, createAnswerDto);
  }
}
