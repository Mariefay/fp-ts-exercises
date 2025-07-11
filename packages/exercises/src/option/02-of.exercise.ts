import { Option, of } from 'fp-ts/Option';


interface User {
  id: number;
  name: string;
}

const createUserOption = (user: User): Option<User> => {};

describe('createUserOption', () => {
  it('returns an option with the user', () => {
    const user = { id: 1, name: 'Alice' };
    const result = createUserOption(user);
    expect(result).toEqual({ _tag: 'Some', value: user });
  });
});
