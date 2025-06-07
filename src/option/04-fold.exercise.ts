import { Option, some, none, fold } from 'fp-ts/Option';
import { expect, describe, it } from 'vitest';

interface User {
  id: number;
  name: string;
  email: string;
}

// @ts-ignore
const getUserEmail = (user: Option<User>): string => {
  // Use the fold method on the Option object to handle both the some and none cases.
  //In the some case, extract the email property from the User object and return it.
  //In the none case, return a default message.
};

//TESTS
describe('getUserEmail', () => {
  const user1: Option<User> = some({
    id: 1,
    name: 'Alice',
    email: 'alice@example.com',
  });
  const user2: Option<User> = none;

  it('returns user email if available', () => {
    const result = getUserEmail(user1);
    expect(result).to.equal('alice@example.com');
  });

  it('returns default message if user email is not available', () => {
    const result = getUserEmail(user2);
    expect(result).to.equal('User email not available');
  });
});
