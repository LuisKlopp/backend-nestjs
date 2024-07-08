import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/users.entity'; // 사용자 엔터티 import
import { CreateUserDto } from './dto/create-user.dto';
import { CreateAnswerDto } from './dto/create-answer.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = new User();
    user.nickname = createUserDto.nickname;
    return await this.userRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    return user;
  }

  async addAnswer(id: number, createAnswerDto: CreateAnswerDto): Promise<User> {
    const user = await this.findOne(id);
    if (!user.answers) {
      user.answers = [];
    }
    user.answers.push(createAnswerDto);
    return await this.userRepository.save(user);
  }
}
