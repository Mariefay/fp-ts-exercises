import * as R from 'fp-ts/Record'
import * as A from 'fp-ts/Array'
import { pipe } from 'fp-ts/function'
import { describe, it, expect } from 'vitest'

type UserData = {
  name: string
  email: string
  age: number
  active: boolean
}

export const processUserData = (users: Record<string, UserData>): Record<string, string> =>
  pipe(
    users,
    R.filter((user) => user.active),
    R.filter((user) => user.age >= 18),
    R.map((user) => `${user.name} (${user.email})`)
  )

export const aggregateByCategory = (
  items: Record<string, { category: string; value: number }>
): Record<string, number> =>
  pipe(
    items,
    R.collect((_, item) => item),
    A.reduce({} as Record<string, number>, (acc, item) => ({
      ...acc,
      [item.category]: (acc[item.category] || 0) + item.value,
    }))
  )

//TESTS
describe('Record real-world pipeline', () => {
  it('processes user data', () => {
    const users: Record<string, UserData> = {
      u1: { name: 'Alice', email: 'alice@example.com', age: 25, active: true },
      u2: { name: 'Bob', email: 'bob@example.com', age: 17, active: true },
      u3: { name: 'Charlie', email: 'charlie@example.com', age: 30, active: false },
      u4: { name: 'David', email: 'david@example.com', age: 22, active: true },
    }

    const result = processUserData(users)
    expect(result).toEqual({
      u1: 'Alice (alice@example.com)',
      u4: 'David (david@example.com)',
    })
  })

  it('aggregates by category', () => {
    const items = {
      item1: { category: 'food', value: 10 },
      item2: { category: 'tech', value: 50 },
      item3: { category: 'food', value: 15 },
      item4: { category: 'tech', value: 30 },
      item5: { category: 'books', value: 20 },
    }

    const result = aggregateByCategory(items)
    expect(result).toEqual({
      food: 25,
      tech: 80,
      books: 20,
    })
  })
})
