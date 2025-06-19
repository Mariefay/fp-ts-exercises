import { Option, fromNullable } from 'fp-ts/Option';
import { expect, describe, it } from 'vitest';

interface User {
  id: number;
  name: string;
  age: number;
  address?: string | null;
}

const getUserAddress = (user: User): Option<string> => {};

describe('getUserAddress', () => {
  const user1: User = { id: 1, name: 'Alice', age: 25 };
  const user2: User = { id: 2, name: 'Bob', age: 30, address: '123 Main St' };
  const user3: User = { id: 3, name: 'Charlie', age: 35, address: null };

  it('returns none if user has no address', () => {
    const result = getUserAddress(user1);
    expect(result).to.deep.equal({ _tag: 'None' });
  });

  it('returns some with the address if user has an address', () => {
    const result = getUserAddress(user2);
    expect(result).to.deep.equal({ _tag: 'Some', value: '123 Main St' });
  });

  it('returns none if user has a null address', () => {
    const result = getUserAddress(user3);
    expect(result).to.deep.equal({ _tag: 'None' });
  });
});
