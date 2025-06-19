import { Option, some, none, getOrElse } from 'fp-ts/Option';
import { pipe } from 'fp-ts/lib/function';

export const getValueOrElse = (fallback: () => number) => (option: Option<number>): number => {
  throw new Error('Not implemented');
};
