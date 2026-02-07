import { describe, it, expect } from 'vitest'

type Product = {
  id: number
  name: string
  price: number
  category: string
  inStock: boolean
}

// @ts-ignore
const getAffordableElectronics = (products: Product[], maxPrice: number): string[] => {
  //TODO: Create a pipeline that:
  // 1. Filters for electronics category
  // 2. Filters for in-stock items
  // 3. Filters for items under maxPrice
  // 4. Sorts by price (lowest first)
  // 5. Maps to product names
}

// @ts-ignore
const calculateTotalRevenue = (orders: Array<{ items: Array<{ price: number; quantity: number }> }>): number => {
  //TODO: Create a pipeline that:
  // 1. FlatMaps to get all items from all orders
  // 2. Maps each item to its total (price * quantity)
  // 3. Reduces to sum all totals
}

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
