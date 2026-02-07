import * as RTE from 'fp-ts/ReaderTaskEither'
import * as E from 'fp-ts/Either'
import { pipe } from 'fp-ts/function'
import { describe, it, expect } from 'vitest'

type AppConfig = {
  apiUrl: string
  apiKey: string
  cache: Record<string, unknown>
}

export const fetchFromCache = <A>(key: string): RTE.ReaderTaskEither<AppConfig, string, A> =>
  pipe(
    RTE.ask<AppConfig>(),
    RTE.flatMap((config) =>
      config.cache[key]
        ? RTE.right(config.cache[key] as A)
        : RTE.left(`Cache miss: ${key}`)
    )
  )

export const fetchFromApi = (endpoint: string): RTE.ReaderTaskEither<AppConfig, string, { data: string }> =>
  pipe(
    RTE.asks((config: AppConfig) => `${config.apiUrl}${endpoint}`),
    RTE.map((url) => ({ data: url }))
  )

export const fetchWithFallback = (key: string, endpoint: string): RTE.ReaderTaskEither<AppConfig, string, unknown> =>
  pipe(
    fetchFromCache(key),
    RTE.orElse(() => fetchFromApi(endpoint))
  )

//TESTS
describe('ReaderTaskEither practical', () => {
  const config: AppConfig = {
    apiUrl: 'https://api.example.com',
    apiKey: 'secret',
    cache: { user1: { id: 1, name: 'Alice' } },
  }

  it('fetches from cache when available', async () => {
    const result = await fetchFromCache('user1')(config)()
    expect(E.isRight(result)).toBe(true)
    if (E.isRight(result)) {
      expect(result.right).toEqual({ id: 1, name: 'Alice' })
    }
  })

  it('fails when cache miss', async () => {
    const result = await fetchFromCache('user999')(config)()
    expect(E.isLeft(result)).toBe(true)
  })

  it('fetches from API with config', async () => {
    const result = await fetchFromApi('/users/1')(config)()
    expect(E.isRight(result)).toBe(true)
    if (E.isRight(result)) {
      expect(result.right).toEqual({ data: 'https://api.example.com/users/1' })
    }
  })

  it('uses fallback when cache misses', async () => {
    const result = await fetchWithFallback('user999', '/users/999')(config)()
    expect(E.isRight(result)).toBe(true)
    if (E.isRight(result)) {
      expect(result.right).toEqual({ data: 'https://api.example.com/users/999' })
    }
  })
})
