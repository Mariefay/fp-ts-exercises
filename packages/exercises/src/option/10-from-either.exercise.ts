import { Option, some, none, fromEither } from 'fp-ts/Option';
import { Either, left, right } from 'fp-ts/Either';

interface User {
  id: number;
  name: string;
  age: number;
}

const getUserById = (id: number): Either<string, User> => {
  if (id < 1) {
    return left('Invalid user ID');
  }
  return right({ id, name: `User ${id}`, age: id * 10 });
};

export const eitherToOption = (either: Either<string, number>): Option<number> => {
  throw new Error('Not implemented');
};
