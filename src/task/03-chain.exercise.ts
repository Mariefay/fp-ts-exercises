import * as T from 'fp-ts/Task'
import { pipe } from 'fp-ts/function'
import { describe, it, expect } from 'vitest'

const fetchUser = (id: number): T.Task<{ id: number; name: string; companyId: number }> =>
  T.of({ id, name: `User ${id}`, companyId: id })

const fetchCompany = (companyId: number): T.Task<{ id: number; name: string }> =>
  T.of({ id: companyId, name: `Company ${companyId}` })

// @ts-ignore
const fetchUserWithCompany = (userId: number): T.Task<{ user: string; company: string }> => {
  //TODO: Chain fetchUser and fetchCompany to get both names
  //HINT: Use T.flatMap (or T.chain) to sequence async operations
}

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
