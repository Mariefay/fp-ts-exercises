import * as TE from 'fp-ts/TaskEither'
import { pipe } from 'fp-ts/function'
import { describe, it, expect } from 'vitest'

export const getMessage = (te: TE.TaskEither<string, number>): Promise<string> =>
  pipe(
    te,
    TE.match(
      (error) => `Error: ${error}`,
      (value) => `Success: ${value}`
    )
  )()

export const getWithDefault = (te: TE.TaskEither<string, number>): Promise<number> =>
  pipe(
    te,
    TE.getOrElse(() => () => Promise.resolve(0))
  )()

//TESTS
describe('TaskEither fold operations', () => {
  it('matches success case', async () => {
    const task = TE.right(42)
    const result = await getMessage(task)
    expect(result).toBe('Success: 42')
  })

  it('matches error case', async () => {
    const task = TE.left('failed')
    const result = await getMessage(task)
    expect(result).toBe('Error: failed')
  })

  it('gets success value', async () => {
    const task = TE.right(100)
    const result = await getWithDefault(task)
    expect(result).toBe(100)
  })

  it('gets default on error', async () => {
    const task = TE.left('error')
    const result = await getWithDefault(task)
    expect(result).toBe(0)
  })
})
