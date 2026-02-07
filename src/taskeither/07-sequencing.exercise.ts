import * as TE from 'fp-ts/TaskEither'
import * as A from 'fp-ts/Array'
import { pipe } from 'fp-ts/function'
import { describe, it, expect } from 'vitest'

// @ts-ignore
const fetchAll = (ids: number[]): TE.TaskEither<string, number[]> => {
  //TODO: Fetch all ids sequentially (one after another)
  //HINT: Use A.traverse with TE.ApplicativeSeq to sequence TaskEithers
  const fetchOne = (id: number): TE.TaskEither<string, number> =>
    id > 0 ? TE.right(id * 10) : TE.left(`Invalid id: ${id}`)

  //TODO: Apply traverse to fetch all
}

// @ts-ignore
const processInOrder = (numbers: number[]): TE.TaskEither<string, number[]> => {
  //TODO: Process each number (multiply by 2) in order
  //HINT: Map each number to a TaskEither, then sequence them
  const process = (n: number): TE.TaskEither<string, number> =>
    TE.right(n * 2)

  //TODO: Use A.traverse to sequence the processing
}

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
