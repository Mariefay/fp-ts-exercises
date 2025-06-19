import { Option, some, none, toNullable } from 'fp-ts/Option';

interface User {
  id: number;
  name: string;
  address?: string;
}

export const optionToNullable = (option: Option<number>): number | null => {
  throw new Error('Not implemented');
};
