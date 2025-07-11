import { some, none } from 'fp-ts/Option';
import { expect, describe, it } from 'vitest';
export const getUserById = (users, id) => {
    const user = users.find((u) => u.id === id);
    return user ? some(user) : none;
};
describe('getUserById', () => {
    const users = [
        { id: 1, name: 'Alice' },
        { id: 2, name: 'Bob' },
        { id: 3, name: 'Charlie' },
    ];
    it('returns an option with user if it exists', () => {
        const user = getUserById(users, 2);
        expect(user).to.deep.equal({ _tag: 'Some', value: { id: 2, name: 'Bob' } });
    });
    it('returns none if user does not exist', () => {
        const user = getUserById(users, 4);
        expect(user).to.deep.equal({ _tag: 'None' });
    });
});
