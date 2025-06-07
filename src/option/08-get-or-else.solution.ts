import { Option, some, none, getOrElse } from 'fp-ts/Option';
import { expect, describe, it } from 'vitest';
import { pipe } from 'fp-ts/lib/function';

const getAddressString = (addressOption: Option<string>): string => {
  return pipe(
    addressOption,
    getOrElse(() => 'No address provided')
  );
};

describe('getAddressString', () => {
  const addressOption1: Option<string> = none;
  const addressOption2: Option<string> = some('123 Main St');

  it('returns default string when address option is none', () => {
    const result = getAddressString(addressOption1);
    expect(result).to.equal('No address provided');
  });

  it('returns the address string in the correct format when address option is some', () => {
    const result = getAddressString(addressOption2);
    expect(result).to.equal('123 Main St');
  });
});
