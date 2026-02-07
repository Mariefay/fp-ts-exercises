import * as RTE from 'fp-ts/ReaderTaskEither'
import * as E from 'fp-ts/Either'
import { pipe } from 'fp-ts/function'
import { describe, it, expect } from 'vitest'

type Config = {}

const failingOperation = (): RTE.ReaderTaskEither<Config, number, string> =>
  RTE.left(404)

// @ts-ignore
const convertErrorToMessage = (): RTE.ReaderTaskEither<Config, string, string> => {
  //TODO: Convert the error code to a user-friendly message
  //HINT: Use pipe with failingOperation and RTE.mapLeft
}

//TESTS
describe('ReaderTaskEither mapLeft', () => {
  const config: Config = {}

  it('transforms error value', async () => {
    const result = await convertErrorToMessage()(config)()
    expect(E.isLeft(result)).toBe(true)
    if (E.isLeft(result)) {
      expect(result.left).toBe('Error 404: Not Found')
    }
  })
})
