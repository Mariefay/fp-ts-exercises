import * as RTE from 'fp-ts/ReaderTaskEither'
import * as E from 'fp-ts/Either'
import { pipe } from 'fp-ts/function'
import { describe, it, expect } from 'vitest'

type Config = {
  apiUrl: string
}

export const getApiUrl = (): RTE.ReaderTaskEither<Config, string, string> =>
  pipe(
    RTE.ask<Config>(),
    RTE.map((config) => config.apiUrl)
  )

export const failWithError = (error: string): RTE.ReaderTaskEither<Config, string, never> =>
  RTE.left(error)

//TESTS
describe('ReaderTaskEither basic', () => {
  const config: Config = { apiUrl: 'https://api.example.com' }

  it('reads config and returns Right', async () => {
    const result = await getApiUrl()(config)()
    expect(E.isRight(result)).toBe(true)
    if (E.isRight(result)) {
      expect(result.right).toBe('https://api.example.com')
    }
  })

  it('creates Left error', async () => {
    const result = await failWithError('Something went wrong')(config)()
    expect(E.isLeft(result)).toBe(true)
    if (E.isLeft(result)) {
      expect(result.left).toBe('Something went wrong')
    }
  })
})
