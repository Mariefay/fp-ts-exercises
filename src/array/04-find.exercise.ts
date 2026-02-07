import * as O from 'fp-ts/Option'
import { describe, it, expect } from 'vitest'

// @ts-ignore
const findFirstEven = (numbers: number[]): O.Option<number> => {
  //TODO: Use Array.findFirst to find the first even number
  //HINT: Returns an Option because the element might not exist
}

// @ts-ignore
const findUserByName = (users: Array<{ name: string; age: number }>, targetName: string): O.Option<{ name: string; age: number }> => {
  //TODO: Use Array.findFirst to find a user by name
}

//TESTS
describe('Array find operations', () => {
  it('finds first even number', () => {
    const result = findFirstEven([1, 3, 4, 5, 6])
    expect(O.isSome(result)).toBe(true)
    expect(result).toEqual(O.some(4))
  })

  it('returns None when no even number found', () => {
    const result = findFirstEven([1, 3, 5])
    expect(O.isNone(result)).toBe(true)
  })

  it('finds user by name', () => {
    const users = [
      { name: 'Alice', age: 25 },
      { name: 'Bob', age: 30 },
      { name: 'Charlie', age: 35 },
    ]
    const result = findUserByName(users, 'Bob')
    expect(result).toEqual(O.some({ name: 'Bob', age: 30 }))
  })

  it('returns None when user not found', () => {
    const users = [{ name: 'Alice', age: 25 }]
    const result = findUserByName(users, 'Bob')
    expect(O.isNone(result)).toBe(true)
  })
})
