import * as TE from 'fp-ts/TaskEither'
import { describe, it, expect } from 'vitest'

export const wrapPromise = (promise: Promise<number>): TE.TaskEither<Error, number> =>
  TE.tryCatch(
    () => promise,
    (error) => error as Error
  )

export const safeFetch = (url: string): TE.TaskEither<string, string> =>
  TE.tryCatch(
    () => fetch(url).then((res) => res.text()),
    (error) => String(error)
  )

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
