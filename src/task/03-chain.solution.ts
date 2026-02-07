import * as T from 'fp-ts/Task'
import { pipe } from 'fp-ts/function'
import { describe, it, expect } from 'vitest'

const fetchUser = (id: number): T.Task<{ id: number; name: string; companyId: number }> =>
  T.of({ id, name: `User ${id}`, companyId: id })

const fetchCompany = (companyId: number): T.Task<{ id: number; name: string }> =>
  T.of({ id: companyId, name: `Company ${companyId}` })

export const fetchUserWithCompany = (userId: number): T.Task<{ user: string; company: string }> =>
  pipe(
    fetchUser(userId),
    T.flatMap((user) =>
      pipe(
        fetchCompany(user.companyId),
        T.map((company) => ({ user: user.name, company: company.name }))
      )
    )
  )

//TESTS
describe('Task chain', () => {
  it('chains tasks', async () => {
    const result = await fetchUserWithCompany(1)()
    expect(result).toEqual({
      user: 'User 1',
      company: 'Company 1',
    })
  })
})
