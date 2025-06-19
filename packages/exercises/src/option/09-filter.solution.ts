import { Option, some, none, filter, of } from 'fp-ts/Option';
import { test, expect, describe, it } from '@jest/globals';
import { pipe } from 'fp-ts/lib/function';

interface User {
  id: number;
  name: string;
  age: number;
}

export const getAdultUser = (userOption: Option<User>): Option<User> => {
  return pipe(
    userOption,
    filter((user) => user.age >= 18)
  );
};

describe('getAdultUser', () => {
  it('returns some if user is 18 or older', () => {
    const user = { id: 1, name: 'Alice', age: 25 };
    const userOption = some(user);
    const result = getAdultUser(userOption);
    expect(result).toEqual({ _tag: 'Some', value: user });
  });

  it('returns none if user is under 18', () => {
    const user = { id: 2, name: 'Bob', age: 16 };
    const userOption = some(user);
    const result = getAdultUser(userOption);
    expect(result).toEqual({ _tag: 'None' });
  });

  it('returns none if user option is none', () => {
    const userOption = none;
    const result = getAdultUser(userOption);
    expect(result).toEqual({ _tag: 'None' });
  });
});
