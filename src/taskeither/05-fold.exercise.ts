import * as TE from 'fp-ts/TaskEither'
import { pipe } from 'fp-ts/function'
import { describe, it, expect } from 'vitest'

// @ts-ignore
const getMessage = (te: TE.TaskEither<string, number>): Promise<string> => {
  //TODO: Use TE.match (formerly fold) to handle both success and error cases
  //HINT: On error return "Error: {error}", on success return "Success: {value}"
}

// @ts-ignore
const getWithDefault = (te: TE.TaskEither<string, number>): Promise<number> => {
  //TODO: Use TE.getOrElse to return the success value or default to 0 on error
}

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
