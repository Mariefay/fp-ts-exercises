import { Option, of } from 'fp-ts/Option';
import { expect, describe, it } from 'vitest';

interface User {
  id: number;
  name: string;
}

export const createUserOption = (user: User): Option<User> => {
  return of(user);
};

describe('createUserOption', () => {
  it('returns an option with the user', () => {
    const user = { id: 1, name: 'Alice' };
    const result = createUserOption(user);
    expect(result).to.deep.equal({ _tag: 'Some', value: user });
  });
});
