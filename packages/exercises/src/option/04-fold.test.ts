import { some, none } from 'fp-ts/Option';

import { getUserEmail } from './04-fold.exercise';

describe('getUserEmail', () => {
  it('returns user email if user exists and has email', () => {
    const user = some({ id: 1, name: 'Alice', email: 'alice@example.com' });
    const result = getUserEmail(user);
    expect(result).toBe('alice@example.com');
  });

  it('returns default message if user does not exist', () => {
    const user = none;
    const result = getUserEmail(user);
    expect(result).toBe('User email not available');
  });
});
