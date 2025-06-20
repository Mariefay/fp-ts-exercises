import { Option, some, none, toUndefined } from 'fp-ts/Option';


interface User {
  id: number;
  name: string;
}

export const getUserAsUndefined = (
  userOption: Option<User>
): User | undefined => {
  return toUndefined(userOption);
};

describe('getUserAsUndefined', () => {
  it('returns undefined if user option is none', () => {
    const userOption = none;
    const result = getUserAsUndefined(userOption);
    expect(result).toBeUndefined();
  });

  it('returns the user if user option is some', () => {
    const user = { id: 1, name: 'Alice' };
    const userOption = some(user);
    const result = getUserAsUndefined(userOption);
    expect(result).toEqual(user);
  });
});
