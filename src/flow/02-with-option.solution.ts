import { flow } from 'fp-ts/function'
import * as O from 'fp-ts/Option'
import { describe, it, expect } from 'vitest'

interface User {
  id: number
  name: string
  email: string
}

const users: User[] = [
  { id: 1, name: 'Alice', email: 'alice@example.com' },
  { id: 2, name: 'Bob', email: 'bob@example.com' },
]

export const getUserEmailById = flow(
  (id: number) => users.find(u => u.id === id),
  O.fromNullable,
  O.map(user => user.email)
)

//TESTS
describe('getUserEmailById', () => {
  it('returns Some with email when user found', () => {
    const result = getUserEmailById(1)
    expect(result).toEqual({ _tag: 'Some', value: 'alice@example.com' })
  })

  it('returns None when user not found', () => {
    const result = getUserEmailById(99)
    expect(result).toEqual({ _tag: 'None' })
  })

  it('is reusable', () => {
    expect(getUserEmailById(2)).toEqual({ _tag: 'Some', value: 'bob@example.com' })
    expect(getUserEmailById(1)).toEqual({ _tag: 'Some', value: 'alice@example.com' })
  })
})
