import * as Ord from 'fp-ts/Ord'
import * as A from 'fp-ts/Array'
import * as N from 'fp-ts/number'
import * as S from 'fp-ts/string'
import { pipe } from 'fp-ts/function'
import { describe, it, expect } from 'vitest'

type Task = {
  priority: number
  name: string
}

// @ts-ignore
const sortTasks = (tasks: Task[]): Task[] => {
  //TODO: Sort by priority (descending), then by name (ascending)
  //HINT: Use A.sortBy with multiple Ord instances
}

// @ts-ignore
const isBetween = (min: number, max: number, value: number): boolean => {
  //TODO: Check if value is between min and max (inclusive)
  //HINT: Use Ord.between with N.Ord
}

//TESTS
describe('Ord practical', () => {
  it('sorts tasks by priority then name', () => {
    const tasks: Task[] = [
      { priority: 2, name: 'Review PR' },
      { priority: 1, name: 'Fix bug' },
      { priority: 2, name: 'Deploy' },
      { priority: 3, name: 'Meeting' },
    ]
    const result = sortTasks(tasks)

    expect(result[0].priority).toBe(3)
    expect(result[1].priority).toBe(2)
    expect(result[1].name).toBe('Deploy')
    expect(result[2].name).toBe('Review PR')
  })

  it('checks if value is between bounds', () => {
    expect(isBetween(0, 10, 5)).toBe(true)
    expect(isBetween(0, 10, 0)).toBe(true)
    expect(isBetween(0, 10, 10)).toBe(true)
    expect(isBetween(0, 10, -1)).toBe(false)
    expect(isBetween(0, 10, 11)).toBe(false)
  })
})
