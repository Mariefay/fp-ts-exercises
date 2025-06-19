import { Option, fromNullable } from 'fp-ts/Option';

interface User {
  id: number;
  name: string;
  age: number;
  address?: string | null;
}

export const safeParseInt = (value: string): Option<number> => {
  throw new Error('Not implemented');
};
