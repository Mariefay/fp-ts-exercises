import * as Ord from 'fp-ts/Ord'
import * as N from 'fp-ts/number'
import * as S from 'fp-ts/string'
import { pipe } from 'fp-ts/function'
import { describe, it, expect } from 'vitest'

type Person = {
  name: string
  age: number
}

// @ts-ignore
const byAge: Ord.Ord<Person> = {
  //TODO: Create an Ord for Person by age
  //HINT: Use Ord.contramap to derive from N.Ord
}

// @ts-ignore
const byNameLength: Ord.Ord<Person> = {
  //TODO: Create an Ord for Person by name length
  //HINT: Use pipe with Ord.contramap
}

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
