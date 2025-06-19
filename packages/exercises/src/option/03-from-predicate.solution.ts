import { Option, some, none, fromPredicate } from 'fp-ts/Option';
import { test, expect, describe, it } from '@jest/globals';
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

describe('getValidUserAddress', () => {
  it('returns some if user is over 18', () => {
    const user = { id: 1, name: 'Alice', age: 25 };
    const result = getValidUserAddress(user);
    expect(result).toEqual({ _tag: 'Some', value: user });
  });

  it('returns none if user is under 18', () => {
    const user = { id: 2, name: 'Bob', age: 16 };
    const result = getValidUserAddress(user);
    expect(result).toEqual({ _tag: 'None' });
  });
});
