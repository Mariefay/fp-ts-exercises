import * as TE from 'fp-ts/TaskEither'
import { pipe } from 'fp-ts/function'
import { describe, it, expect } from 'vitest'

export const fetchUser = (id: number): TE.TaskEither<string, { id: number; name: string; companyId: number }> =>
  id > 0
    ? TE.right({ id, name: `User ${id}`, companyId: id })
    : TE.left('Invalid user id')

export const fetchCompany = (companyId: number): TE.TaskEither<string, { id: number; name: string }> =>
  companyId > 0
    ? TE.right({ id: companyId, name: `Company ${companyId}` })
    : TE.left('Invalid company id')

export const fetchUserWithCompany = (userId: number): TE.TaskEither<string, { user: string; company: string }> =>
  pipe(
    fetchUser(userId),
    TE.flatMap((user) =>
      pipe(
        fetchCompany(user.companyId),
        TE.map((company) => ({ user: user.name, company: company.name }))
      )
    )
  )

//TESTS
describe('TaskEither chaining', () => {
  it('chains successful operations', async () => {
    const result = await fetchUserWithCompany(1)()
    expect(result._tag).toBe('Right')
    if (result._tag === 'Right') {
      expect(result.right).toEqual({ user: 'User 1', company: 'Company 1' })
    }
  })

  it('fails on invalid user id', async () => {
    const result = await fetchUserWithCompany(0)()
    expect(result._tag).toBe('Left')
  })
})
