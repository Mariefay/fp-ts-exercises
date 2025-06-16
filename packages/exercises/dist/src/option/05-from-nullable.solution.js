import { fromNullable } from 'fp-ts/Option';
import { expect, describe, it } from 'vitest';
export const getUserAddress = (user) => {
    return fromNullable(user.address);
};
describe('getUserAddress', () => {
    const user1 = { id: 1, name: 'Alice', age: 25 };
    const user2 = { id: 2, name: 'Bob', age: 30, address: '123 Main St' };
    const user3 = { id: 3, name: 'Charlie', age: 35, address: null };
    it('returns none if user has no address', () => {
        const result = getUserAddress(user1);
        expect(result).to.deep.equal({ _tag: 'None' });
    });
    it('returns some with the address if user has an address', () => {
        const result = getUserAddress(user2);
        expect(result).to.deep.equal({ _tag: 'Some', value: '123 Main St' });
    });
    it('returns none if user has a null address', () => {
        const result = getUserAddress(user3);
        expect(result).to.deep.equal({ _tag: 'None' });
    });
});
