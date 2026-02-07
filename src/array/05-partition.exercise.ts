import { describe, it, expect } from 'vitest'

type Partitioned<T> = {
  readonly left: T[]
  readonly right: T[]
}

// @ts-ignore
const partitionByAge = (users: Array<{ name: string; age: number }>): Partitioned<{ name: string; age: number }> => {
  //TODO: Use Array.partition to separate adults (18+) from minors
  //HINT: partition returns { left: failing predicate, right: passing predicate }
}

// @ts-ignore
const partitionNumbers = (numbers: number[]): Partitioned<number> => {
  //TODO: Use Array.partition to separate odd and even numbers
  //HINT: right array will contain elements passing the predicate (even numbers)
}

//TESTS
describe('Array partition operations', () => {
  it('partitions users by age', () => {
    const users = [
      { name: 'Alice', age: 25 },
      { name: 'Bob', age: 15 },
      { name: 'Charlie', age: 30 },
      { name: 'David', age: 17 },
    ]
    const result = partitionByAge(users)
    expect(result.left).toEqual([
      { name: 'Bob', age: 15 },
      { name: 'David', age: 17 },
    ])
    expect(result.right).toEqual([
      { name: 'Alice', age: 25 },
      { name: 'Charlie', age: 30 },
    ])
  })

  it('partitions numbers into odd and even', () => {
    const result = partitionNumbers([1, 2, 3, 4, 5, 6])
    expect(result.left).toEqual([1, 3, 5])
    expect(result.right).toEqual([2, 4, 6])
  })
})
