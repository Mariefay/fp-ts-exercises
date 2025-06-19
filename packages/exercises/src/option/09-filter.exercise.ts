import { Option, some, none, filter, of } from 'fp-ts/Option';
import { pipe } from 'fp-ts/lib/function';

interface User {
  id: number;
  name: string;
  age: number;
}

export const getAdultUser = (userOption: Option<User>): Option<User> => {
  throw new Error('Not implemented');
};
