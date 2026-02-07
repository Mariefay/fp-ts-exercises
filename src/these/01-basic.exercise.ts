import * as Th from 'fp-ts/These'
import { describe, it, expect } from 'vitest'

// @ts-ignore
const createLeft = (error: string): Th.These<string, number> => {
  //TODO: Create a These with only the left value
  //HINT: Use Th.left
}

// @ts-ignore
const createRight = (value: number): Th.These<string, number> => {
  //TODO: Create a These with only the right value
  //HINT: Use Th.right
}

// @ts-ignore
const createBoth = (warning: string, value: number): Th.These<string, number> => {
  //TODO: Create a These with both left and right values
  //HINT: Use Th.both
}

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
