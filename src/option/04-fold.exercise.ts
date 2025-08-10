import { describe, it, expect } from 'vitest'

interface User {
  id: number
  name: string
  email: string
}

// @ts-ignore
const getUserEmail = (user: O.Option<User>): string => {
  // Use the fold method on the Option object to handle both the some and O.none cases.
  //In the some case, extract the email property from the User object and return it.
  //In the O.none case, return a default message.
}

//TESTS
describe('getUserEmail', () => {
  const user1: O.Option<User> = O.some({
    id: 1,
    name: 'Alice',
    email: 'alice@example.com',
  })
  const user2: O.Option<User> = O.none

  it('returns user email if available', () => {
    const result = getUserEmail(user1)
    expect(result).toEqual('alice@example.com')
  })

  it('returns default message if user email is not available', () => {
    const result = getUserEmail(user2)
    expect(result).toEqual('User email not available')
  })
})
