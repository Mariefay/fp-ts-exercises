import * as O from 'fp-ts/Option'
import { describe, it, expect } from 'vitest'

interface User {
  id: number
  name: string
}

export const getUserById = (users: User[], id: number): O.Option<User> => {
  const user = users.find(u => u.id === id)
  return user ? O.some(user) : O.none
}

//TESTS
describe('getUserById', () => {
  const users = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
    { id: 3, name: 'Charlie' },
  ]

  it('returns an option with user if it exists', () => {
    const user = getUserById(users, 2)
    expect(user).toEqual({ _tag: 'Some', value: { id: 2, name: 'Bob' } })
  })

  it('returns O.none if user does not exist', () => {
    const user = getUserById(users, 4)
    expect(user).toEqual({ _tag: 'None' })
  })
})
