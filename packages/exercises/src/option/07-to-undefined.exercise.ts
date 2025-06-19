import { Option, some, none, toUndefined } from 'fp-ts/Option';

interface User {
  id: number;
  name: string;
}

export const optionToUndefined = (option: Option<number>): number | undefined => {
  throw new Error('Not implemented');
};
