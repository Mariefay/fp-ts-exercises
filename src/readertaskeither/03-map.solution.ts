import * as RTE from 'fp-ts/ReaderTaskEither'
import * as E from 'fp-ts/Either'
import { pipe } from 'fp-ts/function'
import { describe, it, expect } from 'vitest'

type Config = {
  baseUrl: string
}

const getBaseUrl = (): RTE.ReaderTaskEither<Config, string, string> =>
  RTE.asks((config) => config.baseUrl)

export const buildApiEndpoint = (path: string): RTE.ReaderTaskEither<Config, string, string> =>
  pipe(
    getBaseUrl(),
    RTE.map((url) => `${url}${path}`)
  )

export const getUrlLength = (): RTE.ReaderTaskEither<Config, string, number> =>
  pipe(
    getBaseUrl(),
    RTE.map((url) => url.length)
  )

//TESTS
describe('ReaderTaskEither map', () => {
  const config: Config = { baseUrl: 'https://api.example.com' }

  it('builds API endpoint', async () => {
    const result = await buildApiEndpoint('/users')(config)()
    expect(E.isRight(result)).toBe(true)
    if (E.isRight(result)) {
      expect(result.right).toBe('https://api.example.com/users')
    }
  })

  it('gets URL length', async () => {
    const result = await getUrlLength()(config)()
    expect(E.isRight(result)).toBe(true)
    if (E.isRight(result)) {
      expect(result.right).toBe(23)
    }
  })
})
