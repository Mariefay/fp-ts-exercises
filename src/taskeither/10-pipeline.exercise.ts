import * as TE from 'fp-ts/TaskEither'
import * as A from 'fp-ts/Array'
import { pipe } from 'fp-ts/function'
import { describe, it, expect } from 'vitest'

type ValidationError = string[]
type User = { id: number; email: string; age: number }
type ProcessedUser = { id: number; email: string; ageGroup: string }

// @ts-ignore
const validateUser = (user: User): TE.TaskEither<ValidationError, User> => {
  //TODO: Validate user (email must contain @, age must be 18+)
  //HINT: Collect errors in an array, return left if any errors
  const errors: string[] = []
  if (!user.email.includes('@')) errors.push('Invalid email')
  if (user.age < 18) errors.push('User must be 18+')

  //TODO: Return left with errors or right with user
}

// @ts-ignore
const enrichUser = (user: User): TE.TaskEither<ValidationError, ProcessedUser> => {
  //TODO: Add age group (18-30: 'young', 31-50: 'middle', 50+: 'senior')
  //HINT: Map the user and add the ageGroup field
}

// @ts-ignore
const processUsers = (users: User[]): TE.TaskEither<ValidationError, ProcessedUser[]> => {
  //TODO: Create a complete pipeline:
  // 1. Validate each user (fail fast on first invalid)
  // 2. Enrich each valid user with age group
  // 3. Return array of processed users
  //HINT: Use A.traverse to sequence the operations
}

//TESTS
describe('TaskEither complex pipeline', () => {
  it('processes valid users', async () => {
    const users: User[] = [
      { id: 1, email: 'alice@example.com', age: 25 },
      { id: 2, email: 'bob@example.com', age: 35 },
      { id: 3, email: 'charlie@example.com', age: 55 },
    ]

    const result = await processUsers(users)()
    expect(result._tag).toBe('Right')
    if (result._tag === 'Right') {
      expect(result.right).toEqual([
        { id: 1, email: 'alice@example.com', ageGroup: 'young' },
        { id: 2, email: 'bob@example.com', ageGroup: 'middle' },
        { id: 3, email: 'charlie@example.com', ageGroup: 'senior' },
      ])
    }
  })

  it('fails on invalid user', async () => {
    const users: User[] = [
      { id: 1, email: 'alice@example.com', age: 25 },
      { id: 2, email: 'invalid-email', age: 16 },
    ]

    const result = await processUsers(users)()
    expect(result._tag).toBe('Left')
    if (result._tag === 'Left') {
      expect(result.left.length).toBeGreaterThan(0)
    }
  })
})
