import { Option, some, none, filter, of } from 'fp-ts/Option';
import { expect, describe, it } from 'vitest';

//@ts-ignore
const getValidUserAddress = (address: Option<string>): Option<string> => {
  //Return none if address is none and the address string if address is some
  //Use option.filter()
};

describe('getValidUserAddress', () => {
  it('returns none if user has no address', () => {
    const result = getValidUserAddress(none);
    expect(result).to.equal(none);
  });

  it('returns none if user has an address that is too short', () => {
    const result = getValidUserAddress(of('456'));
    expect(result).to.equal(none);
  });

  it('returns the valid address if user has an address that is long enough', () => {
    const result = getValidUserAddress(of('123 Main St'));
    expect(result).to.eql(some('123 Main St'));
  });
});
