import { pipe } from 'fp-ts/function'
import { describe, it, expect } from 'vitest'

interface Product {
  id: number
  name: string
  price: number
  inStock: boolean
}

const products: Product[] = [
  { id: 1, name: 'Laptop', price: 1000, inStock: true },
  { id: 2, name: 'Mouse', price: 25, inStock: false },
  { id: 3, name: 'Keyboard', price: 75, inStock: true },
  { id: 4, name: 'Monitor', price: 300, inStock: true },
  { id: 5, name: 'Webcam', price: 50, inStock: false },
]

export const getAffordableInStockProductNames = (maxPrice: number): string[] =>
  pipe(
    products,
    (ps) => ps.filter(p => p.inStock),
    (ps) => ps.filter(p => p.price <= maxPrice),
    (ps) => ps.map(p => p.name),
    (names) => names.sort()
  )

//TESTS
describe('getAffordableInStockProductNames', () => {
  it('returns products under 100', () => {
    const result = getAffordableInStockProductNames(100)
    expect(result).toEqual(['Keyboard'])
  })

  it('returns products under 500', () => {
    const result = getAffordableInStockProductNames(500)
    expect(result).toEqual(['Keyboard', 'Monitor'])
  })

  it('returns empty array when no products match', () => {
    const result = getAffordableInStockProductNames(10)
    expect(result).toEqual([])
  })
})
