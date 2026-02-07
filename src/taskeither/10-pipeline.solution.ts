import * as TE from 'fp-ts/TaskEither'
import * as A from 'fp-ts/Array'
import { pipe } from 'fp-ts/function'
import { describe, it, expect } from 'vitest'

type ValidationError = string[]
type User = { id: number; email: string; age: number }
type ProcessedUser = { id: number; email: string; ageGroup: string }

export const validateUser = (user: User): TE.TaskEither<ValidationError, User> => {
  const errors: string[] = []
  if (!user.email.includes('@')) errors.push('Invalid email')
  if (user.age < 18) errors.push('User must be 18+')

  return errors.length > 0 ? TE.left(errors) : TE.right(user)
}

export const enrichUser = (user: User): TE.TaskEither<ValidationError, ProcessedUser> =>
  pipe(
    TE.right(user),
    TE.map((u) => ({
      id: u.id,
      email: u.email,
      ageGroup: u.age <= 30 ? 'young' : u.age <= 50 ? 'middle' : 'senior',
    }))
  )

export const processUsers = (users: User[]): TE.TaskEither<ValidationError, ProcessedUser[]> =>
  pipe(
    users,
    A.traverse(TE.ApplicativeSeq)((user) =>
      pipe(
        validateUser(user),
        TE.flatMap(enrichUser)
      )
    )
  )

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
