import { describe, it, expect } from 'vitest'
import * as O from 'fp-ts/Option'
import { pipe } from 'fp-ts/function'

interface User {
  id: number
  name: string
  email: string
}

const getUserEmail = (user: O.Option<User>): string =>
  pipe(
    user,
    O.fold(
      () => 'User email not available',
      (user: User) => user.email
    )
  )

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
