import * as E from 'fp-ts/Either'
import { pipe } from 'fp-ts/function'
import { describe, it, expect } from 'vitest'

interface User {
  id: number
  name: string
  age: number
}

export const validateAdult = (user: User): E.Either<string, User> =>
  pipe(
    user,
    E.fromPredicate(
      (u) => u.age >= 18,
      () => 'Must be 18 or older'
    )
  )

//TESTS
describe('validateAdult', () => {
  const adult: User = { id: 1, name: 'Alice', age: 25 }
  const minor: User = { id: 2, name: 'Bob', age: 16 }

  it('returns right for adult user', () => {
    const result = validateAdult(adult)
    expect(result).toEqual({ _tag: 'Right', right: { id: 1, name: 'Alice', age: 25 } })
  })

  it('returns left for minor user', () => {
    const result = validateAdult(minor)
    expect(result).toEqual({ _tag: 'Left', left: 'Must be 18 or older' })
  })
})
