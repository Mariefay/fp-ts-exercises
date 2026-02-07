import * as T from 'fp-ts/Task'
import { pipe } from 'fp-ts/function'
import { describe, it, expect } from 'vitest'

// @ts-ignore
const delay = (ms: number): T.Task<void> => {
  //TODO: Create a Task that delays for the given milliseconds
  //HINT: () => new Promise(resolve => setTimeout(resolve, ms))
}

// @ts-ignore
const delayedComputation = <A>(value: A, ms: number): T.Task<A> => {
  //TODO: Return the value after a delay
  //HINT: Chain delay with a map that returns the value
}

//TESTS
describe('Task delay', () => {
  it('delays execution', async () => {
    const start = Date.now()
    await delay(20)()
    const duration = Date.now() - start
    expect(duration).toBeGreaterThanOrEqual(15)
  })

  it('delays computation', async () => {
    const start = Date.now()
    const result = await delayedComputation('done', 20)()
    const duration = Date.now() - start

    expect(result).toBe('done')
    expect(duration).toBeGreaterThanOrEqual(15)
  })
})
