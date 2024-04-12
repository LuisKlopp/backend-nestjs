import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Param,
  Put,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { Todo } from './entities/todo.entity';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Get()
  getAll() {
    return this.todosService.findAll();
  }

  @Post()
  async create(@Body() todoData: Todo): Promise<Todo> {
    return this.todosService.create(todoData);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.todosService.delete(id);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() todoData: Todo): Promise<Todo> {
    return this.todosService.update(id, todoData);
  }
}
