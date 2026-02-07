import * as RTE from 'fp-ts/ReaderTaskEither'
import * as E from 'fp-ts/Either'
import { pipe } from 'fp-ts/function'
import { describe, it, expect } from 'vitest'

type Config = {
  apiUrl: string
  timeout: number
}

const getConfig = (): RTE.ReaderTaskEither<Config, string, Config> =>
  RTE.ask<Config>()

// @ts-ignore
const withCustomTimeout = <A>(
  rte: RTE.ReaderTaskEither<Config, string, A>,
  newTimeout: number
): RTE.ReaderTaskEither<Config, string, A> => {
  //TODO: Run rte with a modified config where timeout is changed
  //HINT: Use RTE.local to modify the environment
}

//TESTS
describe('ReaderTaskEither local', () => {
  const config: Config = { apiUrl: 'https://api.example.com', timeout: 5000 }

  it('gets original config', async () => {
    const result = await getConfig()(config)()
    expect(E.isRight(result)).toBe(true)
    if (E.isRight(result)) {
      expect(result.right.timeout).toBe(5000)
    }
  })

  it('overrides timeout locally', async () => {
    const result = await withCustomTimeout(getConfig(), 10000)(config)()
    expect(E.isRight(result)).toBe(true)
    if (E.isRight(result)) {
      expect(result.right.timeout).toBe(10000)
      expect(result.right.apiUrl).toBe('https://api.example.com')
    }
  })

  it('does not affect original config', async () => {
    await withCustomTimeout(getConfig(), 10000)(config)()
    const result = await getConfig()(config)()
    expect(E.isRight(result)).toBe(true)
    if (E.isRight(result)) {
      expect(result.right.timeout).toBe(5000)
    }
  })
})
