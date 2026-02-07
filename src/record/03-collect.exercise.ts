import { describe, it, expect } from 'vitest'

// @ts-ignore
const toArray = (record: Record<string, number>): Array<{ key: string; value: number }> => {
  //TODO: Use Record.collect to convert record to array of key-value pairs
  //HINT: collect takes a function (key, value) => result
}

// @ts-ignore
const sumValues = (record: Record<string, number>): number => {
  //TODO: Use Record.collect to get all values, then sum them
  //HINT: Collect values into an array, then reduce
}

//TESTS
describe('Record collect operations', () => {
  it('converts record to array', () => {
    const input = { a: 1, b: 2, c: 3 }
    const result = toArray(input)
    expect(result).toEqual([
      { key: 'a', value: 1 },
      { key: 'b', value: 2 },
      { key: 'c', value: 3 },
    ])
  })

  it('sums all values', () => {
    const input = { x: 10, y: 20, z: 30 }
    const result = sumValues(input)
    expect(result).toBe(60)
  })

  it('handles empty record', () => {
    const result = sumValues({})
    expect(result).toBe(0)
  })
})
