import * as E from 'fp-ts/Either'
import { pipe } from 'fp-ts/function'
import { describe, it, expect } from 'vitest'

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

export const validateAge = (user: User): E.Either<ValidationError, User> => {
  return user.age >= 18 ? E.right(user) : E.left('User too young')
}

export const findAndValidateUser = (id: number, users: User[]): E.Either<ValidationError, User> =>
  pipe(
    findUser(id, users),
    E.chain(validateAge)
  )

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
