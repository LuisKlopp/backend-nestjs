import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodosModule } from './todos/todos.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PostsModule } from './posts/posts.module';
import { CommentsModule } from './comments/comments.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatModule } from './chat/chat.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './users/users.module';
import { BalanceModule } from './balance/balance.module';
import { QuestionModule } from './question/question.module';
import { ChoiceModule } from './choice/choice.module';
import { VoteModule } from './vote/vote.module';
import { ImageGameModule } from './image-game/image-game.module';
import { UserAnswerModule } from './user-answer/user-answer.module';
import { HistoryUserModule } from './history-user/history-user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DB_HOST'),
        port: Number(configService.get('DB_PORT')),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: false,
        loggin: true,
        timezone: '+09:00',
      }),
    }),
    TodosModule,
    PostsModule,
    CommentsModule,
    ChatModule,
    AuthModule,
    UserModule,
    BalanceModule,
    QuestionModule,
    ChoiceModule,
    VoteModule,
    ImageGameModule,
    UserAnswerModule,
    HistoryUserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
