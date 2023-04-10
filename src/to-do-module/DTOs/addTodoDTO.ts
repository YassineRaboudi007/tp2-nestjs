import { MinLength, MaxLength, IsNotEmpty } from 'class-validator';
import { handleValidationError } from '../helpers/ErrorValidationHandler';

export default class AddTodoDTO {
  @IsNotEmpty({
    message: 'Must not be empty',
  })
  @MinLength(3, {
    message: handleValidationError('min'),
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
}
