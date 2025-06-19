import { Option, of } from 'fp-ts/Option';

interface User {
  id: number;
  name: string;
}

export const createUserOption = (user: User): Option<User> => {
  throw new Error('Not implemented');
};
