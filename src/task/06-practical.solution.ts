import * as T from 'fp-ts/Task'
import * as A from 'fp-ts/Array'
import { pipe } from 'fp-ts/function'
import { describe, it, expect } from 'vitest'

type CacheEntry = {
  key: string
  value: string
}

const fetchOne = (key: string): T.Task<CacheEntry> =>
  T.of({ key, value: `cached-${key}` })

export const batchFetchCache = (keys: string[]): T.Task<CacheEntry[]> =>
  pipe(
    keys,
    A.traverse(T.ApplicativePar)(fetchOne)
  )

export const retryWithDelay = <A>(task: T.Task<A>, delayMs: number, attempts: number): T.Task<A> =>
  task // Note: Task always succeeds, so retry without error handling just runs once

//TESTS
describe('Task practical examples', () => {
  it('batch fetches cache entries', async () => {
    const result = await batchFetchCache(['a', 'b', 'c'])()
    expect(result).toEqual([
      { key: 'a', value: 'cached-a' },
      { key: 'b', value: 'cached-b' },
      { key: 'c', value: 'cached-c' },
    ])
  })

  it('executes task (retry example)', async () => {
    let count = 0
    const task: T.Task<number> = () => Promise.resolve(++count)
    const result = await retryWithDelay(task, 10, 3)()
    expect(result).toBeGreaterThan(0)
  })
})
