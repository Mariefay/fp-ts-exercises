import * as T from 'fp-ts/Task'
import { pipe } from 'fp-ts/function'
import { describe, it, expect } from 'vitest'

// @ts-ignore
const doubleTask = (task: T.Task<number>): T.Task<number> => {
  //TODO: Map over the Task to double the value
  //HINT: Use T.map
}

// @ts-ignore
const upperCaseTask = (task: T.Task<string>): T.Task<string> => {
  //TODO: Map over the Task to uppercase the string
}

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
