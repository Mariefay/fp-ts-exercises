import { describe, it, expect } from 'vitest'
import * as E from 'fp-ts/Either'

interface User {
  id: number
  name: string
  age: number
}

type ValidationError = 'Invalid ID' | 'User not found' | 'User too young'

const findUser = (id: number, users: User[]): E.Either<ValidationError, User> => {
  if (id <= 0) return E.left('Invalid ID')
  const user = users.find(u => u.id === id)
  return user ? E.right(user) : E.left('User not found')
}

// @ts-ignore
const validateAge = (user: User): E.Either<ValidationError, User> => {
  //TODO:
  //Check if user.age is >= 18
  //If yes, return E.right(user)
  //If no, return E.left('User too young')
}

// @ts-ignore
const findAndValidateUser = (id: number, users: User[]): E.Either<ValidationError, User> => {
  //TODO:
  //Use E.chain to compose findUser and validateAge
  //First find the user, then validate their age
  //Use pipe for functional composition
}

//TESTS
describe('findAndValidateUser', () => {
  const users = [
    { id: 1, name: 'Alice', age: 25 },
    { id: 2, name: 'Bob', age: 16 },
    { id: 3, name: 'Charlie', age: 30 },
  ]

  it('returns right with user if valid and adult', () => {
    const result = findAndValidateUser(1, users)
    expect(result).toEqual({ _tag: 'Right', right: { id: 1, name: 'Alice', age: 25 } })
  })

  it('returns left if ID is invalid', () => {
    const result = findAndValidateUser(0, users)
    expect(result).toEqual({ _tag: 'Left', left: 'Invalid ID' })
  })

  it('returns left if user not found', () => {
    const result = findAndValidateUser(99, users)
    expect(result).toEqual({ _tag: 'Left', left: 'User not found' })
  })

  it('returns left if user too young', () => {
    const result = findAndValidateUser(2, users)
    expect(result).toEqual({ _tag: 'Left', left: 'User too young' })
  })
})
