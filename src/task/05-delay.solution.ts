import * as T from 'fp-ts/Task'
import { pipe } from 'fp-ts/function'
import { describe, it, expect } from 'vitest'

export const delay = (ms: number): T.Task<void> =>
  () => new Promise((resolve) => setTimeout(resolve, ms))

export const delayedComputation = <A>(value: A, ms: number): T.Task<A> =>
  pipe(
    delay(ms),
    T.map(() => value)
  )

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
