import * as A from 'fp-ts/Array'
import { pipe } from 'fp-ts/function'
import { describe, it, expect } from 'vitest'

type Partitioned<T> = {
  readonly left: T[]
  readonly right: T[]
}

export const partitionByAge = (users: Array<{ name: string; age: number }>): Partitioned<{ name: string; age: number }> =>
  pipe(
    users,
    A.partition((user) => user.age >= 18)
  )

export const partitionNumbers = (numbers: number[]): Partitioned<number> =>
  pipe(
    numbers,
    A.partition((n) => n % 2 === 0)
  )

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
