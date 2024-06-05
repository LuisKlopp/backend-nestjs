// src/auth/auth.service.ts
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signup(createUserDto: CreateUserDto) {
    const user = await this.userService.create(createUserDto);
    return this.login(user);
  }

  async login(user: any) {
    const payload = { nickname: user.nickname, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
