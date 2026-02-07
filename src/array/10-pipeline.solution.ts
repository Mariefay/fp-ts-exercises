import * as A from 'fp-ts/Array'
import * as N from 'fp-ts/number'
import { pipe } from 'fp-ts/function'
import { describe, it, expect } from 'vitest'

type Product = {
  id: number
  name: string
  price: number
  category: string
  inStock: boolean
}

export const getAffordableElectronics = (products: Product[], maxPrice: number): string[] =>
  pipe(
    products,
    A.filter((p) => p.category === 'Electronics'),
    A.filter((p) => p.inStock),
    A.filter((p) => p.price <= maxPrice),
    A.sort(pipe(N.Ord, (ord) => ({ compare: (a: Product, b: Product) => ord.compare(a.price, b.price) }))),
    A.map((p) => p.name)
  )

export const calculateTotalRevenue = (orders: Array<{ items: Array<{ price: number; quantity: number }> }>): number =>
  pipe(
    orders,
    A.flatMap((order) => order.items),
    A.map((item) => item.price * item.quantity),
    A.reduce(0, (acc, total) => acc + total)
  )

//TESTS
describe('Array real-world pipeline', () => {
  it('gets affordable electronics sorted by price', () => {
    const products: Product[] = [
      { id: 1, name: 'Laptop', price: 999, category: 'Electronics', inStock: true },
      { id: 2, name: 'Mouse', price: 25, category: 'Electronics', inStock: true },
      { id: 3, name: 'Desk', price: 300, category: 'Furniture', inStock: true },
      { id: 4, name: 'Keyboard', price: 75, category: 'Electronics', inStock: true },
      { id: 5, name: 'Monitor', price: 400, category: 'Electronics', inStock: false },
      { id: 6, name: 'Headphones', price: 150, category: 'Electronics', inStock: true },
    ]
    const result = getAffordableElectronics(products, 200)
    expect(result).toEqual(['Mouse', 'Keyboard', 'Headphones'])
  })

  it('calculates total revenue from multiple orders', () => {
    const orders = [
      { items: [{ price: 10, quantity: 2 }, { price: 5, quantity: 3 }] },
      { items: [{ price: 20, quantity: 1 }] },
      { items: [{ price: 15, quantity: 2 }, { price: 8, quantity: 4 }] },
    ]
    const result = calculateTotalRevenue(orders)
    // (10*2 + 5*3) + (20*1) + (15*2 + 8*4) = (20 + 15) + 20 + (30 + 32) = 35 + 20 + 62 = 117
    expect(result).toBe(117)
  })
})
