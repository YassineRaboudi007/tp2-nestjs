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
import { Repository, Like } from 'typeorm';

@Injectable()
export class TodoDbService {
  private todos: ToDoModel[] = [];

  @Inject('uuid') uuidv4;
  constructor(
    @InjectRepository(ToDoEntity)
    private todoRepo: Repository<ToDoEntity>,
  ) {}

  addToDoDb(todo: AddTodoDTO): Promise<ToDoEntity> {
    const toAddTodo = {
      Name: todo.name,
      Desc: todo.desc,
    };
    return this.todoRepo.save(toAddTodo);
  }

  getTodosDb(page: number) {
    return this.todoRepo.find({ skip: 10 * page, take: 10 });
  }

  getSearchTodos(str: string, status: TodoStatusEnum) {
    return this.todoRepo.find({
      where: [
        { Name: Like(`%${str}%`), status },
        { Desc: Like(`%${str}%`), status },
      ],
    });
  }

  getToDoById(@Param('id', ParseIntPipe) id: number) {
    const todo = this.todoRepo.findOne({
      where: {
        id,
      },
    });

    if (!todo) {
      throw new NotFoundException('ToDo Doesnt Exist');
    }

    return todo;
  }

  getToDosCountByStatus() {
    const enumVals = Object.values(TodoStatusEnum);
    const enumKeys = Object.keys(TodoStatusEnum);
    return enumVals.map((val, index) => {
      return [
        enumKeys[index],
        this.todoRepo.findAndCount({
          where: {
            status: val,
          },
        }),
      ];
    });
  }

  deleteToDoByIdDb(@Param('id', ParseIntPipe) id: number) {
    return this.todoRepo.softDelete(id);
  }

  restoreToDoByIdDb(@Param('id', ParseIntPipe) id: number) {
    return this.todoRepo.restore(id);
  }

  async editToDoByIdDb(
    @Param('id', ParseIntPipe) id: number,
    todo: UpdateTodoDTO,
  ): Promise<object> {
    let todoToEdit: ToDoEntity = await this.todoRepo.findOne({
      where: {
        id,
      },
    });

    if (!todoToEdit) {
      throw new NotFoundException('ToDo Doesnt Exist');
    }

    if (todo.name) todoToEdit.Name = todo.name;

    if (todo.status) todoToEdit.status = todo.status;

    if (todo.desc) todoToEdit.Desc = todo.desc;
    return this.todoRepo.update(id, todoToEdit);
  }
}
