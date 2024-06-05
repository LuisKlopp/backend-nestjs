import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(
    @Body('nickname') nickname: string,
    @Body('mbti') mbti: string,
  ) {
    return this.authService.createUser(nickname, mbti);
  }

  @Get('user/:nickname')
  async getUser(@Param('nickname') nickname: string) {
    return this.authService.findUserByNickname(nickname);
  }
}
