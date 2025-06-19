import { Option, some, none, getOrElse } from 'fp-ts/Option';
import { test, expect, describe, it } from '@jest/globals';
import { pipe } from 'fp-ts/lib/function';

const getAddressString = (addressOption: Option<string>): string => {};

describe('getAddressString', () => {
  it('returns the address if option is some', () => {
    const addressOption = some('123 Main St');
    const result = getAddressString(addressOption);
    expect(result).toBe('123 Main St');
  });

  it('returns default message if option is none', () => {
    const addressOption = none;
    const result = getAddressString(addressOption);
    expect(result).toBe('No address provided');
  });
});
