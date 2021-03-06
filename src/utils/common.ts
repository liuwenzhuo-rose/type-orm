import { escape } from 'mysql';
import { isNumber, isString } from './typeCheck';

export const transformValue = (value: any) => {
  if (isNumber(value)) {
    return value;
  } else if (isString(value)) {
    return escape(value);
  }
};
