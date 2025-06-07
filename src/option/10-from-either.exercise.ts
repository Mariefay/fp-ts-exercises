import { Option, some, none, fromEither } from 'fp-ts/Option';
import { Either, left, right } from 'fp-ts/Either';
import { expect, describe, it } from 'vitest';

interface User {
  id: number;
  name: string;
  age: number;
}

const getUserById = (id: number): Either<string, User> => {
  if (id < 1) {
    return left('Invalid user ID');
  }
  return right({ id, name: `User ${id}`, age: id * 10 });
};

//@ts-ignore
const getUserOptionById = (id: number): Option<User> => {
  //create a function that takes an id and returns an option of user using getUserById
};

describe('getUserOptionById', () => {
  it('returns none if user ID is less than 1', () => {
    const result = getUserOptionById(0);
    expect(result).to.equal(none);
  });

  it('returns a some object with the user if user ID is valid', () => {
    const result = getUserOptionById(2);
    expect(result).to.eql(some({ id: 2, name: 'User 2', age: 20 }));
  });
});
