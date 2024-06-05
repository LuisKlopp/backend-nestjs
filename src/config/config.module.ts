import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtConfigService } from './jwt-config.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  providers: [JwtConfigService],
  exports: [JwtConfigService],
})
export class AppConfigModule {}
