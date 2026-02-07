import * as TE from 'fp-ts/TaskEither'
import { describe, it, expect } from 'vitest'

export const successfulTask = (): TE.TaskEither<string, number> =>
  TE.right(42)

export const failedTask = (): TE.TaskEither<string, number> =>
  TE.left('Something went wrong')

//TESTS
describe('TaskEither basics', () => {
  it('creates successful TaskEither', async () => {
    const result = await successfulTask()()
    expect(result._tag).toBe('Right')
    if (result._tag === 'Right') {
      expect(result.right).toBe(42)
    }
  })

  it('creates failed TaskEither', async () => {
    const result = await failedTask()()
    expect(result._tag).toBe('Left')
    if (result._tag === 'Left') {
      expect(result.left).toBe('Something went wrong')
    }
  })
})
