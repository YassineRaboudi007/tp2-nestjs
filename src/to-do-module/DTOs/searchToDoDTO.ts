import { TodoStatusEnum } from '../models/ToDoModel';

export default class SearchTodoDto {
  searchStr?: string;
  status: TodoStatusEnum;
}
