import { Option, some, none } from 'fp-ts/Option';
import { expect, describe, it } from 'vitest';

interface User {
  id: number;
  name: string;
}

const getUserById = (users: User[], id: number): Option<User> => {
};

describe('getUserById', () => {
  const users = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
    { id: 3, name: 'Charlie' },
  ];

  it('returns an option with user if it exists', () => {
    const user = getUserById(users, 2);
    expect(user).to.deep.equal({ _tag: 'Some', value: { id: 2, name: 'Bob' } });
  });

  it('returns none if user does not exist', () => {
    const user = getUserById(users, 4);
    expect(user).to.deep.equal({ _tag: 'None' });
  });
});
