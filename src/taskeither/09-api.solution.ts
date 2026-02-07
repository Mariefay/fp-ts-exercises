import * as TE from 'fp-ts/TaskEither'
import { pipe } from 'fp-ts/function'
import { describe, it, expect } from 'vitest'

type ApiError = {
  status: number
  message: string
}

type User = {
  id: number
  name: string
  email: string
}

export const parseJSON = <T>(response: Response): TE.TaskEither<ApiError, T> =>
  TE.tryCatch(
    () => response.json() as Promise<T>,
    () => ({ status: response.status, message: 'Failed to parse JSON' })
  )

export const fetchUser = (id: number): TE.TaskEither<ApiError, User> => {
  if (id > 0) {
    return TE.right({ id, name: `User ${id}`, email: `user${id}@example.com` })
  }
  return TE.left({ status: 404, message: 'User not found' })
}

export const updateUserEmail = (userId: number, newEmail: string): TE.TaskEither<ApiError, User> =>
  pipe(
    fetchUser(userId),
    TE.map((user) => ({ ...user, email: newEmail }))
  )

//TESTS
describe('TaskEither API operations', () => {
  it('fetches user successfully', async () => {
    const result = await fetchUser(1)()
    expect(result._tag).toBe('Right')
    if (result._tag === 'Right') {
      expect(result.right.id).toBe(1)
      expect(result.right.name).toBe('User 1')
    }
  })

  it('handles API error', async () => {
    const result = await fetchUser(0)()
    expect(result._tag).toBe('Left')
    if (result._tag === 'Left') {
      expect(result.left.status).toBe(404)
    }
  })

  it('updates user email', async () => {
    const result = await updateUserEmail(1, 'newemail@example.com')()
    expect(result._tag).toBe('Right')
    if (result._tag === 'Right') {
      expect(result.right.email).toBe('newemail@example.com')
    }
  })
})
