import * as TE from 'fp-ts/TaskEither'
import * as A from 'fp-ts/Array'
import { pipe } from 'fp-ts/function'
import { describe, it, expect } from 'vitest'

const fetchOne = (id: number): TE.TaskEither<string, number> =>
  id > 0 ? TE.right(id * 10) : TE.left(`Invalid id: ${id}`)

export const fetchAll = (ids: number[]): TE.TaskEither<string, number[]> =>
  pipe(
    ids,
    A.traverse(TE.ApplicativeSeq)(fetchOne)
  )

const process = (n: number): TE.TaskEither<string, number> =>
  TE.right(n * 2)

export const processInOrder = (numbers: number[]): TE.TaskEither<string, number[]> =>
  pipe(
    numbers,
    A.traverse(TE.ApplicativeSeq)(process)
  )

//TESTS
describe('TaskEither sequencing', () => {
  it('fetches all successfully', async () => {
    const result = await fetchAll([1, 2, 3])()
    expect(result._tag).toBe('Right')
    if (result._tag === 'Right') {
      expect(result.right).toEqual([10, 20, 30])
    }
  })

  it('fails on first error', async () => {
    const result = await fetchAll([1, 0, 3])()
    expect(result._tag).toBe('Left')
  })

  it('processes in order', async () => {
    const result = await processInOrder([5, 10, 15])()
    expect(result._tag).toBe('Right')
    if (result._tag === 'Right') {
      expect(result.right).toEqual([10, 20, 30])
    }
  })
})
