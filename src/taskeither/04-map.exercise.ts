import * as TE from 'fp-ts/TaskEither'
import { pipe } from 'fp-ts/function'
import { describe, it, expect } from 'vitest'

// @ts-ignore
const doubleSuccess = (te: TE.TaskEither<string, number>): TE.TaskEither<string, number> => {
  //TODO: Use TE.map to double the success value
}

// @ts-ignore
const prefixError = (te: TE.TaskEither<string, number>): TE.TaskEither<string, number> => {
  //TODO: Use TE.mapLeft to prefix the error with "ERROR: "
}

//TESTS
describe('TaskEither map operations', () => {
  it('maps success value', async () => {
    const task = TE.right(21)
    const result = await doubleSuccess(task)()
    expect(result._tag).toBe('Right')
    if (result._tag === 'Right') {
      expect(result.right).toBe(42)
    }
  })

  it('does not affect errors on map', async () => {
    const task = TE.left('error')
    const result = await doubleSuccess(task)()
    expect(result._tag).toBe('Left')
  })

  it('maps error value', async () => {
    const task = TE.left('failure')
    const result = await prefixError(task)()
    expect(result._tag).toBe('Left')
    if (result._tag === 'Left') {
      expect(result.left).toBe('ERROR: failure')
    }
  })

  it('does not affect success on mapLeft', async () => {
    const task = TE.right(42)
    const result = await prefixError(task)()
    expect(result._tag).toBe('Right')
  })
})
