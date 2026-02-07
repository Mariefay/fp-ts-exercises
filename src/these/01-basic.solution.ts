import * as Th from 'fp-ts/These'
import { describe, it, expect } from 'vitest'

export const createLeft = (error: string): Th.These<string, number> =>
  Th.left(error)

export const createRight = (value: number): Th.These<string, number> =>
  Th.right(value)

export const createBoth = (warning: string, value: number): Th.These<string, number> =>
  Th.both(warning, value)

//TESTS
describe('These basic', () => {
  it('creates left', () => {
    const result = createLeft('error')
    expect(Th.isLeft(result)).toBe(true)
  })

  it('creates right', () => {
    const result = createRight(42)
    expect(Th.isRight(result)).toBe(true)
  })

  it('creates both', () => {
    const result = createBoth('warning', 42)
    expect(Th.isBoth(result)).toBe(true)
  })
})
