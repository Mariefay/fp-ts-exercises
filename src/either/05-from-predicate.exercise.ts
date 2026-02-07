import { describe, it, expect } from 'vitest'

interface User {
  id: number
  name: string
  age: number
}

// @ts-ignore
const validateAdult = (user: User): E.Either<string, User> => {
  //TODO:
  //Use E.fromPredicate to validate that user.age >= 18
  //If true, return E.right(user)
  //If false, return E.left('Must be 18 or older')
  //Use pipe for functional composition
}

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
