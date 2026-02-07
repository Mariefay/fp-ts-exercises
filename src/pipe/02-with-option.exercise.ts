import { describe, it, expect } from 'vitest'
import * as O from 'fp-ts/Option'

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

// @ts-ignore
const getUserNameById = (id: number): O.Option<string> => {
  //TODO:
  //Use pipe to:
  //1. Find the user by id (returns User | undefined)
  //2. Convert to Option using O.fromNullable
  //3. Map to extract the user's name
  //Import pipe from 'fp-ts/function'
}

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
