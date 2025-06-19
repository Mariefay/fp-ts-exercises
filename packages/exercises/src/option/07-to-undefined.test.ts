import { some, none } from 'fp-ts/Option';

import { optionToUndefined } from './07-to-undefined.exercise';

describe('optionToUndefined', () => {
  it('returns value for some', () => {
    const option = some(42);
    const result = optionToUndefined(option);
    expect(result).toBe(42);
  });

  it('returns undefined for none', () => {
    const option = none;
    const result = optionToUndefined(option);
    expect(result).toBeUndefined();
  });
});
