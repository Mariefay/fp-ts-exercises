import * as T from 'fp-ts/Task'
import * as A from 'fp-ts/Array'
import { pipe } from 'fp-ts/function'
import { describe, it, expect } from 'vitest'

const delayedValue = (value: number, ms: number): T.Task<number> =>
  () => new Promise((resolve) => setTimeout(() => resolve(value), ms))

// @ts-ignore
const fetchAllParallel = (ids: number[]): T.Task<number[]> => {
  //TODO: Fetch all ids in parallel (all at once)
  //HINT: Use A.traverse with T.ApplicativePar
  const fetchOne = (id: number): T.Task<number> => delayedValue(id * 10, 10)

  //TODO: Apply traverse
}

// @ts-ignore
const combineThree = (t1: T.Task<number>, t2: T.Task<number>, t3: T.Task<number>): T.Task<number> => {
  //TODO: Run three tasks in parallel and sum results
  //HINT: Use T.ApplicativePar with sequenceT
}

//TESTS
describe('Task parallel execution', () => {
  it('fetches all in parallel', async () => {
    const start = Date.now()
    const result = await fetchAllParallel([1, 2, 3])()
    const duration = Date.now() - start

    expect(result).toEqual([10, 20, 30])
    expect(duration).toBeLessThan(25) // Should be ~10ms, not 30ms
  })

  it('combines three tasks in parallel', async () => {
    const result = await combineThree(T.of(10), T.of(20), T.of(30))()
    expect(result).toBe(60)
  })
})
