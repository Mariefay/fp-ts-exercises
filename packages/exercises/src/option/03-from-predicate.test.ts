import { getValidUserAddress } from './03-from-predicate.exercise';

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
