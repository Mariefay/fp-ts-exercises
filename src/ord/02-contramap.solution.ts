import * as Ord from 'fp-ts/Ord'
import * as N from 'fp-ts/number'
import * as S from 'fp-ts/string'
import { pipe } from 'fp-ts/function'
import { describe, it, expect } from 'vitest'

type Person = {
  name: string
  age: number
}

export const byAge: Ord.Ord<Person> = pipe(
  N.Ord,
  Ord.contramap((p: Person) => p.age)
)

export const byNameLength: Ord.Ord<Person> = pipe(
  N.Ord,
  Ord.contramap((p: Person) => p.name.length)
)

//TESTS
describe('Ord contramap', () => {
  it('sorts by age', () => {
    const people: Person[] = [
      { name: 'Alice', age: 30 },
      { name: 'Bob', age: 25 },
      { name: 'Charlie', age: 35 },
    ]
    const sorted = [...people].sort(byAge.compare)
    expect(sorted[0].name).toBe('Bob')
    expect(sorted[2].name).toBe('Charlie')
  })

  it('sorts by name length', () => {
    const people: Person[] = [
      { name: 'Alice', age: 30 },
      { name: 'Bob', age: 25 },
      { name: 'Charlie', age: 35 },
    ]
    const sorted = [...people].sort(byNameLength.compare)
    expect(sorted[0].name).toBe('Bob')
    expect(sorted[2].name).toBe('Charlie')
  })
})
