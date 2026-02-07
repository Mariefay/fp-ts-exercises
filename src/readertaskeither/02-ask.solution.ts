import * as RTE from 'fp-ts/ReaderTaskEither'
import * as E from 'fp-ts/Either'
import { describe, it, expect } from 'vitest'

type Env = {
  dbUrl: string
  apiKey: string
  timeout: number
}

export const getDbConnection = (): RTE.ReaderTaskEither<Env, string, string> =>
  RTE.asks((env) => env.dbUrl)

export const getTimeout = (): RTE.ReaderTaskEither<Env, string, number> =>
  RTE.asks((env) => env.timeout)

//TESTS
describe('ReaderTaskEither ask', () => {
  const env: Env = {
    dbUrl: 'postgresql://localhost:5432',
    apiKey: 'secret-key',
    timeout: 5000,
  }

  it('reads dbUrl from environment', async () => {
    const result = await getDbConnection()(env)()
    expect(E.isRight(result)).toBe(true)
    if (E.isRight(result)) {
      expect(result.right).toBe('postgresql://localhost:5432')
    }
  })

  it('reads timeout from environment', async () => {
    const result = await getTimeout()(env)()
    expect(E.isRight(result)).toBe(true)
    if (E.isRight(result)) {
      expect(result.right).toBe(5000)
    }
  })
})
