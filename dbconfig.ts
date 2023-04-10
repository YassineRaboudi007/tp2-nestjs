import { First1681054734750 } from './migrations/1681054734750-first';
import { ToDoEntity } from './src/to-do-module/models/todoEntity';
import { DataSource } from 'typeorm';

export default new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
  database: 'test',
  entities: [ToDoEntity],
  migrations: [First1681054734750],
});
