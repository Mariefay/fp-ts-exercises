import * as T from 'fp-ts/Task'
import { describe, it, expect } from 'vitest'

export const createTask = (value: number): T.Task<number> =>
  T.of(value)

export const delayedTask = (value: string, ms: number): T.Task<string> =>
  () => new Promise((resolve) => setTimeout(() => resolve(value), ms))

//TESTS
describe('Task basics', () => {
  it('creates simple task', async () => {
    const task = createTask(42)
    const result = await task()
    expect(result).toBe(42)
  })

  it('creates delayed task', async () => {
    const task = delayedTask('hello', 10)
    const result = await task()
    expect(result).toBe('hello')
  })
})
