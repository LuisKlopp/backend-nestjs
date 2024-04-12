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

  async create(todoData: Todo): Promise<Todo> {
    const newTodo = this.todoRepository.create(todoData);
    return this.todoRepository.save(newTodo);
  }

  async delete(id: number): Promise<void> {
    await this.todoRepository.delete(id);
  }

  async update(id: number, todoData: Todo): Promise<Todo> {
    await this.todoRepository.update(id, todoData);
    return this.todoRepository.findOne({ where: { id: id } });
  }
}
