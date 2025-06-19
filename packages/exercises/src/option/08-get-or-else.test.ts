import { some, none } from 'fp-ts/Option';

import { getValueOrElse } from './08-get-or-else.exercise';

describe('getValueOrElse', () => {
  it('returns value when some', () => {
    const option = some(42);
    const result = getValueOrElse(() => 0)(option);
    expect(result).toBe(42);
  });

  it('returns else value when none', () => {
    const option = none;
    const result = getValueOrElse(() => 0)(option);
    expect(result).toBe(0);
  });
});
