import * as TE from 'fp-ts/TaskEither'
import * as A from 'fp-ts/Array'
import { pipe } from 'fp-ts/function'
import { describe, it, expect } from 'vitest'

const fetchOne = (id: number): TE.TaskEither<string, number> =>
  TE.tryCatch(
    () => new Promise<number>((resolve) => setTimeout(() => resolve(id * 10), 10)),
    () => `Failed to fetch ${id}`
  )

export const fetchAllParallel = (ids: number[]): TE.TaskEither<string, number[]> =>
  pipe(
    ids,
    A.traverse(TE.ApplicativePar)(fetchOne)
  )

export const combineResults = (
  task1: TE.TaskEither<string, number>,
  task2: TE.TaskEither<string, number>,
  task3: TE.TaskEither<string, number>
): TE.TaskEither<string, number> =>
  pipe(
    TE.Do,
    TE.bind('a', () => task1),
    TE.bind('b', () => task2),
    TE.bind('c', () => task3),
    TE.map(({ a, b, c }) => a + b + c)
  )

//TESTS
describe('TaskEither parallel execution', () => {
  it('fetches all in parallel', async () => {
    const start = Date.now()
    const result = await fetchAllParallel([1, 2, 3])()
    const duration = Date.now() - start

    expect(result._tag).toBe('Right')
    if (result._tag === 'Right') {
      expect(result.right).toEqual([10, 20, 30])
    }
    // Should be faster than sequential (< 25ms vs 30ms)
    expect(duration).toBeLessThan(25)
  })

  it('combines parallel results', async () => {
    const task1 = TE.right(10)
    const task2 = TE.right(20)
    const task3 = TE.right(30)

    const result = await combineResults(task1, task2, task3)()
    expect(result._tag).toBe('Right')
    if (result._tag === 'Right') {
      expect(result.right).toBe(60)
    }
  })
})
