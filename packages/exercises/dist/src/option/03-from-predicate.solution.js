import { fromPredicate } from 'fp-ts/Option';
import { expect, describe, it } from 'vitest';
import { pipe } from 'fp-ts/lib/function';
export const getValidUserAddress = (user) => {
    return pipe(user, fromPredicate((u) => u.age >= 18));
};
describe('getValidUserAddress', () => {
    it('returns some if user is over 18', () => {
        const user = { id: 1, name: 'Alice', age: 25 };
        const result = getValidUserAddress(user);
        expect(result).to.deep.equal({ _tag: 'Some', value: user });
    });
    it('returns none if user is under 18', () => {
        const user = { id: 2, name: 'Bob', age: 16 };
        const result = getValidUserAddress(user);
        expect(result).to.deep.equal({ _tag: 'None' });
    });
});
