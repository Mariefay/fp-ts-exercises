import { describe, it, expect } from 'vitest'
import * as E from 'fp-ts/Either'
import * as O from 'fp-ts/Option'

interface User {
  id: number
  name: string
  age: number
}

const getUserById = (id: number): E.Either<string, User> => {
  if (id < 1) {
    return E.left('Invalid user ID')
  }
  return E.right({ id, name: `User ${id}`, age: id * 10 })
}

//@ts-ignore
const getUserOptionById = (id: number): O.Option<User> => {
  //create a function that takes an id and returns an option of user using getUserById
}

describe('getUserOptionById', () => {
  it('returns O.none if user ID is less than 1', () => {
    const result = getUserOptionById(0)
    expect(result).toEqual(O.none)
  })

  it('returns a some object with the user if user ID is valid', () => {
    const result = getUserOptionById(2)
    expect(result).toEqual(O.some({ id: 2, name: 'User 2', age: 20 }))
  })
})
