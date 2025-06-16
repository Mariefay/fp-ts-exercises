import { some, none, toUndefined } from 'fp-ts/Option';
import { expect, describe, it } from 'vitest';
export const getUserAsUndefined = (userOption) => {
    return toUndefined(userOption);
};
describe('getUserAsUndefined', () => {
    it('returns undefined if user option is none', () => {
        const userOption = none;
        const result = getUserAsUndefined(userOption);
        expect(result).to.be.undefined;
    });
    it('returns the user if user option is some', () => {
        const user = { id: 1, name: 'Alice' };
        const userOption = some(user);
        const result = getUserAsUndefined(userOption);
        expect(result).to.deep.equal(user);
    });
});
