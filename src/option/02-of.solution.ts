import { Option, some, none, of } from 'fp-ts/Option';
import { expect, describe, it } from 'vitest';

interface User {
  id: number;
  name: string;
  age: number;
}

const createUserOptionFromAge =
  (age: number) =>
  (user: User): Option<User> => {
    return user.age === age ? of(user) : none;
  };

describe('createUserOptionFromAge', () => {
  const user1: User = { id: 1, name: 'Alice', age: 25 };
  const user2: User = { id: 2, name: 'Bob', age: 30 };

  it('returns some if user has same age as given age', () => {
    const result = createUserOptionFromAge(30)(user2);
    expect(result).to.deep.equal(some(user2));
  });

  it('returns none if user does not have same age as given age', () => {
    const result = createUserOptionFromAge(20)(user1);
    expect(result).to.deep.equal(none);
  });
});
