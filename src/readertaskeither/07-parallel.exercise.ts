import * as RTE from 'fp-ts/ReaderTaskEither'
import * as A from 'fp-ts/Array'
import * as Ap from 'fp-ts/Apply'
import * as E from 'fp-ts/Either'
import { pipe } from 'fp-ts/function'
import { describe, it, expect } from 'vitest'

type Config = {
  users: Record<number, string>
}

const fetchUser = (id: number): RTE.ReaderTaskEither<Config, string, string> =>
  pipe(
    RTE.ask<Config>(),
    RTE.flatMap((config) =>
      config.users[id]
        ? RTE.right(config.users[id])
        : RTE.left(`User ${id} not found`)
    )
  )

// @ts-ignore
const fetchAllUsers = (ids: number[]): RTE.ReaderTaskEither<Config, string, string[]> => {
  //TODO: Fetch all users in parallel
  //HINT: Use A.traverse with RTE.ApplicativePar
}

// @ts-ignore
const fetchThreeUsers = (
  id1: number,
  id2: number,
  id3: number
): RTE.ReaderTaskEither<Config, string, [string, string, string]> => {
  //TODO: Fetch three users in parallel and return tuple
  //HINT: Use Ap.sequenceT with RTE.ApplicativePar
}

//TESTS
describe('ReaderTaskEither parallel', () => {
  const config: Config = {
    users: { 1: 'Alice', 2: 'Bob', 3: 'Charlie' },
  }

  it('fetches all users in parallel', async () => {
    const result = await fetchAllUsers([1, 2, 3])(config)()
    expect(E.isRight(result)).toBe(true)
    if (E.isRight(result)) {
      expect(result.right).toEqual(['Alice', 'Bob', 'Charlie'])
    }
  })

  it('fetches three users as tuple', async () => {
    const result = await fetchThreeUsers(1, 2, 3)(config)()
    expect(E.isRight(result)).toBe(true)
    if (E.isRight(result)) {
      expect(result.right).toEqual(['Alice', 'Bob', 'Charlie'])
    }
  })

  it('fails if any user not found', async () => {
    const result = await fetchAllUsers([1, 999, 3])(config)()
    expect(E.isLeft(result)).toBe(true)
  })
})
