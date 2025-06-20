import { some, none, filter } from 'fp-ts/Option';
import { expect, describe, it } from 'vitest';
import { pipe } from 'fp-ts/lib/function';
export const getAdultUser = (userOption) => {
    return pipe(userOption, filter((user) => user.age >= 18));
};
describe('getAdultUser', () => {
    it('returns some if user is 18 or older', () => {
        const user = { id: 1, name: 'Alice', age: 25 };
        const userOption = some(user);
        const result = getAdultUser(userOption);
        expect(result).to.deep.equal({ _tag: 'Some', value: user });
    });
    it('returns none if user is under 18', () => {
        const user = { id: 2, name: 'Bob', age: 16 };
        const userOption = some(user);
        const result = getAdultUser(userOption);
        expect(result).to.deep.equal({ _tag: 'None' });
    });
    it('returns none if user option is none', () => {
        const userOption = none;
        const result = getAdultUser(userOption);
        expect(result).to.deep.equal({ _tag: 'None' });
    });
});
