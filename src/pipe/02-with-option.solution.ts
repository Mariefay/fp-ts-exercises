import { pipe } from 'fp-ts/function'
import * as O from 'fp-ts/Option'
import { describe, it, expect } from 'vitest'

interface User {
  id: number
  name: string
  age: number
}

const users: User[] = [
  { id: 1, name: 'Alice', age: 25 },
  { id: 2, name: 'Bob', age: 30 },
  { id: 3, name: 'Charlie', age: 35 },
]

export const getUserNameById = (id: number): O.Option<string> =>
  pipe(
    users.find(u => u.id === id),
    O.fromNullable,
    O.map(user => user.name)
  )

//TESTS
describe('getUserNameById', () => {
  it('returns Some with user name when found', () => {
    const result = getUserNameById(2)
    expect(result).toEqual({ _tag: 'Some', value: 'Bob' })
  })

  it('returns None when user not found', () => {
    const result = getUserNameById(99)
    expect(result).toEqual({ _tag: 'None' })
  })
})
