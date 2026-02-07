import * as TE from 'fp-ts/TaskEither'
import { describe, it, expect } from 'vitest'

// @ts-ignore
const wrapPromise = (promise: Promise<number>): TE.TaskEither<Error, number> => {
  //TODO: Convert a Promise to TaskEither using TE.tryCatch
  //HINT: TE.tryCatch takes the promise function and an error handler
}

// @ts-ignore
const safeFetch = (url: string): TE.TaskEither<string, string> => {
  //TODO: Wrap a fetch call in TaskEither
  //HINT: Use TE.tryCatch and handle errors by converting them to strings
}

//TESTS
describe('TaskEither from Promise', () => {
  it('converts successful promise', async () => {
    const promise = Promise.resolve(100)
    const result = await wrapPromise(promise)()
    expect(result._tag).toBe('Right')
    if (result._tag === 'Right') {
      expect(result.right).toBe(100)
    }
  })

  it('converts failed promise', async () => {
    const promise = Promise.reject(new Error('Failed'))
    const result = await wrapPromise(promise)()
    expect(result._tag).toBe('Left')
    if (result._tag === 'Left') {
      expect(result.left.message).toBe('Failed')
    }
  })
})
