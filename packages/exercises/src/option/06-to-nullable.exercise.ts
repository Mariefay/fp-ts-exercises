import { Option, some, none, toNullable } from 'fp-ts/Option';


interface User {
  id: number;
  name: string;
  address?: string;
}

const getUserAddressAsNullable = (
  userOption: Option<User>
): string | null => {};

describe('getUserAddressAsNullable', () => {
  it('returns null if user option is none', () => {
    const userOption = none;
    const result = getUserAddressAsNullable(userOption);
    expect(result).toBeNull();
  });

  it('returns the address if user option is some and has address', () => {
    const userOption = some({ id: 1, name: 'Alice', address: '123 Main St' });
    const result = getUserAddressAsNullable(userOption);
    expect(result).toBe('123 Main St');
  });

  it('returns undefined if user option is some but has no address', () => {
    const userOption = some({ id: 2, name: 'Bob' });
    const result = getUserAddressAsNullable(userOption);
    expect(result).toBeUndefined();
  });
});
