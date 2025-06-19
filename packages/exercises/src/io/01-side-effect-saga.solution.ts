import { IO, map } from 'fp-ts/IO';
import { pipe } from 'fp-ts/function';
import { expect, describe, it } from 'vitest';

export const getCurrentTime: IO<Date> = () => new Date();

export const getRandomNumber: IO<number> = () => Math.random();

export const generateId: IO<string> = pipe(
  getRandomNumber,
  map((num) => Math.floor(num * 1000000).toString())
);

describe('IO exercises', () => {
  it('generates random ID', () => {
    const id1 = generateId();
    const id2 = generateId();

    expect(typeof id1).toBe('string');
    expect(typeof id2).toBe('string');
    expect(id1).not.toBe(id2);
  });
});
