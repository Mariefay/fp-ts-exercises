import * as Ord from 'fp-ts/Ord'
import * as N from 'fp-ts/number'
import { describe, it, expect } from 'vitest'

type Product = {
  name: string
  price: number
}

const byPrice: Ord.Ord<Product> = Ord.contramap((p: Product) => p.price)(N.Ord)

// @ts-ignore
const getCheapest = (products: Product[]): Product => {
  //TODO: Find the product with minimum price
  //HINT: Use Ord.min with byPrice
}

// @ts-ignore
const getMostExpensive = (products: Product[]): Product => {
  //TODO: Find the product with maximum price
  //HINT: Use Ord.max with byPrice
}

//TESTS
describe('Ord min/max', () => {
  const products: Product[] = [
    { name: 'Laptop', price: 1000 },
    { name: 'Mouse', price: 25 },
    { name: 'Keyboard', price: 75 },
  ]

  it('finds cheapest product', () => {
    const result = getCheapest(products)
    expect(result.name).toBe('Mouse')
  })

  it('finds most expensive product', () => {
    const result = getMostExpensive(products)
    expect(result.name).toBe('Laptop')
  })
})
