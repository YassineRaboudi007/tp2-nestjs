import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import ToDoDTO from '../DTOs/addTodoDTO';
import { TodoDbService } from '../todo-db/todo-db.service';
import { TodoStatusEnum } from '../models/ToDoModel';

@Controller('todos')
export class ToDoController {
  private _todoService: TodoDbService;

  constructor(private todoService: TodoDbService) {
    this._todoService = todoService;
  }

  @Get()
  async getTodos(@Query('page', ParseIntPipe) page: number) {
    return await this._todoService.getTodosDb(page);
  }

  @Get('/stats')
  async getTodosStats() {
    return await this._todoService.getToDosCountByStatus();
  }

  @Get('/search')
  async getSearchTodos(
    @Query('searchStr') str: string,
    @Query('status') status: TodoStatusEnum,
  ) {
    return await this._todoService.getSearchTodos(str, status);
  }

  @Post()
  async addToDo(@Body() todo: ToDoDTO) {
    return await this._todoService.addToDoDb(todo);
  }

  @Get(':id')
  async getToDoById(@Param('id', ParseIntPipe) id: number) {
    return await this._todoService.getToDoById(id);
  }

  @Delete(':id')
  async deleteToDoById(@Param('id', ParseIntPipe) id: number) {
    return await this._todoService.deleteToDoByIdDb(id);
  }

  @Get('/restore/:id')
  async restoreToDoById(@Param('id', ParseIntPipe) id: number) {
    return await this._todoService.restoreToDoByIdDb(id);
  }

  @Put(':id')
  async editToDoById(
    @Param('id', ParseIntPipe) id: number,
    @Body() todo: ToDoDTO,
  ) {
    return await this._todoService.editToDoByIdDb(id, todo);
  }
}
