import { createUserOption } from './02-of.exercise';

describe('createUserOption', () => {
  it('returns an option with the user', () => {
    const user = { id: 1, name: 'Alice' };
    const result = createUserOption(user);
    expect(result).toEqual({ _tag: 'Some', value: user });
  });
});
