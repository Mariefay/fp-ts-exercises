import * as RTE from 'fp-ts/ReaderTaskEither'
import * as E from 'fp-ts/Either'
import { pipe } from 'fp-ts/function'
import { describe, it, expect } from 'vitest'

type Env = {
  users: Record<number, { id: number; name: string; companyId: number }>
  companies: Record<number, { id: number; name: string }>
}

const fetchUser = (userId: number): RTE.ReaderTaskEither<Env, string, { id: number; name: string; companyId: number }> =>
  pipe(
    RTE.ask<Env>(),
    RTE.flatMap((env) =>
      env.users[userId]
        ? RTE.right(env.users[userId])
        : RTE.left(`User ${userId} not found`)
    )
  )

const fetchCompany = (companyId: number): RTE.ReaderTaskEither<Env, string, { id: number; name: string }> =>
  pipe(
    RTE.ask<Env>(),
    RTE.flatMap((env) =>
      env.companies[companyId]
        ? RTE.right(env.companies[companyId])
        : RTE.left(`Company ${companyId} not found`)
    )
  )

// @ts-ignore
const fetchUserWithCompany = (userId: number): RTE.ReaderTaskEither<Env, string, { user: string; company: string }> => {
  //TODO: Fetch user, then fetch their company, return both names
  //HINT: Use pipe with fetchUser, RTE.flatMap to chain with fetchCompany
}

//TESTS
describe('ReaderTaskEither chain', () => {
  const env: Env = {
    users: {
      1: { id: 1, name: 'Alice', companyId: 10 },
      2: { id: 2, name: 'Bob', companyId: 20 },
    },
    companies: {
      10: { id: 10, name: 'Acme Corp' },
      20: { id: 20, name: 'Tech Inc' },
    },
  }

  it('fetches user with company', async () => {
    const result = await fetchUserWithCompany(1)(env)()
    expect(E.isRight(result)).toBe(true)
    if (E.isRight(result)) {
      expect(result.right).toEqual({ user: 'Alice', company: 'Acme Corp' })
    }
  })

  it('fails when user not found', async () => {
    const result = await fetchUserWithCompany(999)(env)()
    expect(E.isLeft(result)).toBe(true)
    if (E.isLeft(result)) {
      expect(result.left).toBe('User 999 not found')
    }
  })
})
