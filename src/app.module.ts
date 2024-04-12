import { Module } from '@nestjs/common';
import { TodosController } from './todos/todos.controller';
import { TodosService } from './todos/todos.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodosModule } from './todos/todos.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'test',
      entities: [],
      synchronize: true,
    }),
    TodosModule,
  ],
  controllers: [TodosController],
  providers: [TodosService],
})
export class AppModule {}
