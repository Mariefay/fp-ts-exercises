import * as T from 'fp-ts/Task'
import { describe, it, expect } from 'vitest'

// @ts-ignore
const createTask = (value: number): T.Task<number> => {
  //TODO: Create a Task that resolves with the given value
  //HINT: T.of wraps a value in a Task
}

// @ts-ignore
const delayedTask = (value: string, ms: number): T.Task<string> => {
  //TODO: Create a Task that resolves after a delay
  //HINT: Use T.fromTask or wrap a Promise with T.tryCatch (but Task always succeeds)
  //HINT: Actually use () => new Promise(resolve => setTimeout(() => resolve(value), ms))
}

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
