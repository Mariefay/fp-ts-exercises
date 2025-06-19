import { Either, left, right } from 'fp-ts/Either';

import { eitherToOption } from './10-from-either.exercise';

describe('eitherToOption', () => {
  it('returns some for right', () => {
    const either: Either<string, number> = right(42);
    const result = eitherToOption(either);
    expect(result).toEqual({ _tag: 'Some', value: 42 });
  });

  it('returns none for left', () => {
    const either: Either<string, number> = left('error');
    const result = eitherToOption(either);
    expect(result).toEqual({ _tag: 'None' });
  });
});
