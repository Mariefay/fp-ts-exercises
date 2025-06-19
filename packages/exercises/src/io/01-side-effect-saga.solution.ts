import { IO, map } from 'fp-ts/IO';
import { pipe } from 'fp-ts/function';

export const getCurrentTime: IO<Date> = () => new Date();

export const getRandomNumber: IO<number> = () => Math.random();

export const generateId: IO<string> = pipe(
  getRandomNumber,
  map((num) => Math.floor(num * 1000000).toString())
);
