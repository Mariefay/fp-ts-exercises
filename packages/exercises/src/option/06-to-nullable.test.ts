import { some, none } from 'fp-ts/Option';

import { optionToNullable } from './06-to-nullable.exercise';

describe('optionToNullable', () => {
  it('returns value for some', () => {
    const option = some(42);
    const result = optionToNullable(option);
    expect(result).toBe(42);
  });

  it('returns null for none', () => {
    const option = none;
    const result = optionToNullable(option);
    expect(result).toBeNull();
  });
});
