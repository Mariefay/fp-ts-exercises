import * as T from 'fp-ts/Task'
import { pipe } from 'fp-ts/function'
import { describe, it, expect } from 'vitest'

export const doubleTask = (task: T.Task<number>): T.Task<number> =>
  pipe(
    task,
    T.map((n) => n * 2)
  )

export const upperCaseTask = (task: T.Task<string>): T.Task<string> =>
  pipe(
    task,
    T.map((s) => s.toUpperCase())
  )

//TESTS
describe('Task map', () => {
  it('maps task value', async () => {
    const task = T.of(21)
    const result = await doubleTask(task)()
    expect(result).toBe(42)
  })

  it('uppercases task string', async () => {
    const task = T.of('hello')
    const result = await upperCaseTask(task)()
    expect(result).toBe('HELLO')
  })
})
