import { describe, it, expect } from 'vitest'

interface User {
  id: number
  name: string
}

// @ts-ignore
const getUserById = (users: User[], id: number): O.Option<User> => {
  //TODO:
  //Use the find method to search for the user in the users array that has the matching id.
  //If the find method returns a user, return an option with the user wrapped in some.
  //If the find method doesn't return a user, return an option with O.none.
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
