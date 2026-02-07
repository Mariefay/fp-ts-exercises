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

const byPriorityDesc: Ord.Ord<Task> = pipe(
  N.Ord,
  Ord.contramap((t: Task) => t.priority),
  Ord.reverse
)

const byName: Ord.Ord<Task> = pipe(
  S.Ord,
  Ord.contramap((t: Task) => t.name)
)

export const sortTasks = (tasks: Task[]): Task[] =>
  pipe(tasks, A.sortBy([byPriorityDesc, byName]))

export const isBetween = (min: number, max: number, value: number): boolean =>
  Ord.between(N.Ord)(min, max)(value)

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
