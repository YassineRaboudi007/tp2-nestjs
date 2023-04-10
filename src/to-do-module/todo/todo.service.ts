import {
  Inject,
  NotFoundException,
  Param,
  Injectable,
  ParseIntPipe,
} from '@nestjs/common';
import ToDoModel, { TodoStatusEnum } from '../models/ToDoModel';
import AddTodoDTO from '../DTOs/addTodoDTO';
import UpdateTodoDTO from '../DTOs/updateTodoDTO';
import { InjectRepository } from '@nestjs/typeorm';
import { ToDoEntity } from '../models/todoEntity';
import { Repository } from 'typeorm';

@Injectable()
export class TodoService {
  private todos: ToDoModel[] = [];

  @Inject('uuid') uuidv4;
  constructor() {}

  addToDo(todo: AddTodoDTO) {
    const toAddTodo: ToDoModel = {
      id: this.uuidv4(),
      name: todo.name,
      desc: todo.desc,
      date_creation: new Date(),
      status: TodoStatusEnum.waiting,
    };
    this.todos.push(toAddTodo);
    return 'Success';
  }

  getTodos() {
    return this.todos;
  }

  getToDoById(@Param('id') id: string) {
    const todo = this.todos.find((todo) => todo.id == id);
    if (!todo) {
      throw new NotFoundException('ToDo Doesnt Exist');
    }
    return todo;
  }

  deleteToDoById(@Param('id') id: string) {
    const todoToDelete = this.todos.find((todo) => todo.id == id);
    if (!todoToDelete) {
      throw new NotFoundException('ToDo Doesnt Exist');
    }
    const newToDos = this.todos.filter((todo) => todo.id == id);
    this.todos = newToDos;
    return 1;
  }

  editToDoById(@Param('id') id: string, todo: UpdateTodoDTO) {
    let todoToEdit = this.todos.find((todo) => todo.id == id);
    if (!todoToEdit) {
      throw new NotFoundException('ToDo Doesnt Exist');
    }

    if (todo.name) todoToEdit.name = todo.name;

    if (todo.status) todoToEdit.status = todo.status;

    if (todo.desc) todoToEdit.desc = todo.desc;

    return todoToEdit;
  }
}
