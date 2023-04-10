import { TodoStatusEnum } from '../models/ToDoModel';
import { MinLength, MaxLength, IsNotEmpty } from 'class-validator';

export default class UpdateTodoDTO {
  @IsNotEmpty({
    message: 'Must not be empty',
  })
  @MinLength(3, {
    message: 'Min Len 3',
  })
  @MaxLength(10, {
    message: 'Max Len 10',
  })
  name: string;

  @IsNotEmpty({
    message: 'Must not be empty',
  })
  @MinLength(10, {
    message: 'Min Len 10',
  })
  desc: string;
  status?: TodoStatusEnum;
}
