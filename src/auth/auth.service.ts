import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/users.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async createUser(nickname: string, mbti: string): Promise<User> {
    const user = this.usersRepository.create({ nickname, mbti });
    return this.usersRepository.save(user);
  }

  async findUserByNickname(nickname: string): Promise<User> {
    return this.usersRepository.findOne({ where: { nickname } });
  }
}
