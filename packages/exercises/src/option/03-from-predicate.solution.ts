import { Option, some, none, fromPredicate } from 'fp-ts/Option';
import { pipe } from 'fp-ts/lib/function';

interface User {
  id: number;
  name: string;
  age: number;
}

export const getValidUserAddress = (user: User): Option<User> => {
  return pipe(
    user,
    fromPredicate((u) => u.age >= 18)
  );
};
