import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from './entities/todo.entity';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
  ) {}

  getAll(): string {
    return 'dfdfsdfsda';
  }

  findAll(): Promise<Todo[]> {
    return this.todoRepository.find();
  }

  // async create(todoData: Todo): Promise<Todo> {
  //   const newTodo = this.todoRepository.create(todoData);
  //   return await this.todoRepository.save(newTodo);
  // }
}
