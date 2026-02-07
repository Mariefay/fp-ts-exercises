import { describe, it, expect } from 'vitest'

type UserData = {
  name: string
  email: string
  age: number
  active: boolean
}

// @ts-ignore
const processUserData = (users: Record<string, UserData>): Record<string, string> => {
  //TODO: Create a pipeline that:
  // 1. Filters for active users only
  // 2. Filters for users 18 or older
  // 3. Maps to format: "Name (email)"
  //HINT: Chain filter, filter, map operations
}

// @ts-ignore
const aggregateByCategory = (
  items: Record<string, { category: string; value: number }>
): Record<string, number> => {
  //TODO: Group items by category and sum their values
  // 1. Collect items into array
  // 2. Group by category (manually create new record)
  // 3. Sum values for each category
}

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
