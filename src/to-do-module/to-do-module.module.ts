import { TodoService } from './todo/todo.service';
import { ToDoController } from './to-do-controller/to-do-controller.controller';
import { Module } from '@nestjs/common';
import { ToDoEntity } from './models/todoEntity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoDbService } from './todo-db/todo-db.service';

@Module({
  imports: [TypeOrmModule.forFeature([ToDoEntity])],
  providers: [TodoService, TodoDbService],
  controllers: [ToDoController],
})
export class ToDoModuleModule {}
