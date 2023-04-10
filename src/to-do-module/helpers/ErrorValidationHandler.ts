import { ValidationArguments } from 'class-validator';
import { log } from 'console';

export const handleValidationError = (errStr: "min" |"max"|"empty") => {
  return (validationData: ValidationArguments) => {

    log('validationData', validationData);
    if ()
    return `${validationData}`;
  };
};
