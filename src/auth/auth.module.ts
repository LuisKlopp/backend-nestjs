import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { AuthService } from './auth.service';
import { UserModule } from '../users/users.module';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      secret: 'secretKey', // 비밀 키는 환경 변수로 설정하는 것이 좋습니다.
      signOptions: { expiresIn: '60m' }, // 토큰 만료 시간
    }),
  ],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
