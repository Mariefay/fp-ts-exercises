import * as T from 'fp-ts/Task'
import * as A from 'fp-ts/Array'
import { pipe } from 'fp-ts/function'
import { describe, it, expect } from 'vitest'

type CacheEntry = {
  key: string
  value: string
}

// @ts-ignore
const batchFetchCache = (keys: string[]): T.Task<CacheEntry[]> => {
  //TODO: Fetch all cache entries in parallel
  //HINT: Map keys to tasks, then sequence with A.traverse
  const fetchOne = (key: string): T.Task<CacheEntry> =>
    T.of({ key, value: `cached-${key}` })

  //TODO: Use traverse to fetch all
}

// @ts-ignore
const retryWithDelay = <A>(task: T.Task<A>, delayMs: number, attempts: number): T.Task<A> => {
  //TODO: Create a task that retries the given task with delay between attempts
  //HINT: This is complex - for now, just run the task (retry logic would need error handling)
  //NOTE: Task always succeeds, so retry doesn't make much sense without TaskEither
}

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
