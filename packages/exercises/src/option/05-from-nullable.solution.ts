import { Option, fromNullable } from 'fp-ts/Option';

interface User {
  id: number;
  name: string;
  age: number;
  address?: string | null;
}

export const getUserAddress = (user: User): Option<string> => {
  return fromNullable(user.address);
};
