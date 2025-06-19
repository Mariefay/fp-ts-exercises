import { some, none } from 'fp-ts/Option';

import { getAdultUser } from './09-filter.exercise';

describe('getAdultUser', () => {
  it('returns some for adult user', () => {
    const user = { age: 25, name: 'Alice' };
    const userOption = some(user);
    const result = getAdultUser(userOption);
    expect(result).toEqual({ _tag: 'Some', value: user });
  });

  it('returns none for minor user', () => {
    const user = { age: 16, name: 'Bob' };
    const userOption = some(user);
    const result = getAdultUser(userOption);
    expect(result).toEqual({ _tag: 'None' });
  });

  it('returns none for none input', () => {
    const result = getAdultUser(none);
    expect(result).toEqual({ _tag: 'None' });
  });
});
