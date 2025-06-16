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
  it('returns the address if option is some', () => {
    const addressOption = some('123 Main St');
    const result = getAddressString(addressOption);
    expect(result).to.equal('123 Main St');
  });

  it('returns default message if option is none', () => {
    const addressOption = none;
    const result = getAddressString(addressOption);
    expect(result).to.equal('No address provided');
  });
});
