import * as TE from 'fp-ts/TaskEither'
import { pipe } from 'fp-ts/function'
import { describe, it, expect } from 'vitest'

// @ts-ignore
const fetchUser = (id: number): TE.TaskEither<string, { id: number; name: string; companyId: number }> => {
  //TODO: Simulate fetching a user - return Right for valid ids (> 0), Left otherwise
}

// @ts-ignore
const fetchCompany = (companyId: number): TE.TaskEither<string, { id: number; name: string }> => {
  //TODO: Simulate fetching a company - return Right for valid ids (> 0), Left otherwise
}

// @ts-ignore
const fetchUserWithCompany = (userId: number): TE.TaskEither<string, { user: string; company: string }> => {
  //TODO: Chain fetchUser and fetchCompany to get both user and company name
  //HINT: Use pipe with TE.flatMap (or TE.chain) to sequence async operations
}

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
