import { safeParseInt } from './05-from-nullable.exercise';

describe('safeParseInt', () => {
  it('returns some for valid number string', () => {
    const result = safeParseInt('42');
    expect(result).toEqual({ _tag: 'Some', value: 42 });
  });

  it('returns none for invalid string', () => {
    const result = safeParseInt('abc');
    expect(result).toEqual({ _tag: 'None' });
  });

  it('returns none for empty string', () => {
    const result = safeParseInt('');
    expect(result).toEqual({ _tag: 'None' });
  });
});
