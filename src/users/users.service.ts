import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/users.entity'; // 사용자 엔터티 import
import { CreateUserDto } from './dto/create-user.dto';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UserAnswer } from '../user-answer/entities/user-answer.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(UserAnswer)
    private readonly userAnswerRepository: Repository<UserAnswer>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = new User();
    user.nickname = createUserDto.nickname;
    return await this.userRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find({ relations: ['answers'] });
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    return user;
  }

  async addAnswer(
    id: number,
    createAnswerDto: CreateAnswerDto,
  ): Promise<UserAnswer> {
    const user = await this.findOne(id);
    const answer = new UserAnswer();
    answer.message = createAnswerDto.message;
    answer.user = user;
    console.log(answer);
    return await this.userAnswerRepository.save(answer);
  }
}
