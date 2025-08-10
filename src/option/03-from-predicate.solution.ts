import * as O from 'fp-ts/Option'
import { describe, it, expect } from 'vitest'
import { pipe } from 'fp-ts/function'

interface User {
  id: number
  name: string
  age: number
}

const createUserOptionFromAge =
  (age: number) =>
  (user: User): O.Option<User> => {
    const isUserAge = (u: User) => u.age === age
    return pipe(user, O.fromPredicate(isUserAge))
  }

//TESTS
describe('createUserOptionFromAge', () => {
  const user1: User = { id: 1, name: 'Alice', age: 25 }
  const user2: User = { id: 2, name: 'Bob', age: 30 }

  it('returns some if user has same age as given age', () => {
    const result = createUserOptionFromAge(30)(user2)
    expect(result).toEqual(O.some(user2))
  })

  it('returns O.none if user does not have same age as given age', () => {
    const result = createUserOptionFromAge(20)(user1)
    expect(result).toEqual(O.none)
  })
})
