import { some, none, fromEither } from 'fp-ts/Option';
import { left, right } from 'fp-ts/Either';
import { expect, describe, it } from 'vitest';
const getUserById = (id) => {
    if (id < 1) {
        return left('Invalid user ID');
    }
    return right({ id, name: `User ${id}`, age: id * 10 });
};
const getUserOptionById = (id) => fromEither(getUserById(id));
describe('getUserOptionById', () => {
    it('returns none if user ID is less than 1', () => {
        const result = getUserOptionById(0);
        expect(result).to.equal(none);
    });
    it('returns a some object with the user if user ID is valid', () => {
        const result = getUserOptionById(2);
        expect(result).to.eql(some({ id: 2, name: 'User 2', age: 20 }));
    });
});
