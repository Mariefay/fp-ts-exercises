import * as TE from 'fp-ts/TaskEither'
import { describe, it, expect } from 'vitest'

// @ts-ignore
const successfulTask = (): TE.TaskEither<string, number> => {
  //TODO: Create a TaskEither that successfully returns the number 42
  //HINT: Use TE.right for successful values
}

// @ts-ignore
const failedTask = (): TE.TaskEither<string, number> => {
  //TODO: Create a TaskEither that fails with the error "Something went wrong"
  //HINT: Use TE.left for error values
}

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
