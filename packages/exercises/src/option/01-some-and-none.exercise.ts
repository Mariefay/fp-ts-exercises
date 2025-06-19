import { Option, some, none } from 'fp-ts/Option';

interface User {
  id: number;
  name: string;
}

export const getUserById = (users: User[], id: number): Option<User> => {
  throw new Error('Not implemented');
};
