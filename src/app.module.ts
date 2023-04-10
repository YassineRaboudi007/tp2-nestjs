import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModule } from './common/common.module';
import { ToDoController } from './to-do-module/to-do-controller/to-do-controller.controller';
import { TodoDbService } from './to-do-module/todo-db/todo-db.service';
import { ToDoModuleModule } from './to-do-module/to-do-module.module';

@Module({
  imports: [
    CommonModule,
    ToDoModuleModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'test',
      autoLoadEntities: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
