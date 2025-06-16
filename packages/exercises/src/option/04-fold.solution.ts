import { Option, some, none, fold } from 'fp-ts/Option';
import { expect, describe, it } from 'vitest';
import { pipe } from 'fp-ts/lib/function';

interface User {
  id: number;
  name: string;
  email?: string;
}

const getUserEmail = (user: Option<User>): string =>
  pipe(
    user,
    fold(
      () => 'User email not available',
      (u) => u.email || 'User email not available'
    )
  );

describe('getUserEmail', () => {
  it('returns user email if user exists and has email', () => {
    const user = some({ id: 1, name: 'Alice', email: 'alice@example.com' });
    const result = getUserEmail(user);
    expect(result).to.equal('alice@example.com');
  });

  it('returns default message if user does not exist', () => {
    const user = none;
    const result = getUserEmail(user);
    expect(result).to.equal('User email not available');
  });
});
