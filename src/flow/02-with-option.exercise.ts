import { describe, it, expect } from 'vitest'
import * as O from 'fp-ts/Option'

interface User {
  id: number
  name: string
  email: string
}

const users: User[] = [
  { id: 1, name: 'Alice', email: 'alice@example.com' },
  { id: 2, name: 'Bob', email: 'bob@example.com' },
]

// @ts-ignore
const getUserEmailById = flow(
  //TODO:
  //Use flow to create a reusable function that:
  //1. Takes an id (number)
  //2. Finds the user (returns User | undefined)
  //3. Converts to Option
  //4. Maps to extract email
  //Returns O.Option<string>
  //Import flow from 'fp-ts/function'
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
