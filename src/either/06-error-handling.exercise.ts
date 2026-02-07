import { describe, it, expect } from 'vitest'

interface Product {
  id: number
  name: string
  price: number
  stock: number
}

type PurchaseError =
  | 'Product not found'
  | 'Out of stock'
  | 'Insufficient funds'

interface Purchase {
  product: Product
  remainingBalance: number
}

// @ts-ignore
const purchaseProduct = (
  productId: number,
  balance: number,
  products: Product[]
): E.Either<PurchaseError, Purchase> => {
  //TODO:
  //1. Find the product by ID, return E.left('Product not found') if not found
  //2. Check if product.stock > 0, return E.left('Out of stock') if not
  //3. Check if balance >= product.price, return E.left('Insufficient funds') if not
  //4. Return E.right with { product, remainingBalance: balance - product.price }
}

//TESTS
describe('purchaseProduct', () => {
  const products = [
    { id: 1, name: 'Laptop', price: 1000, stock: 5 },
    { id: 2, name: 'Mouse', price: 25, stock: 0 },
    { id: 3, name: 'Keyboard', price: 75, stock: 10 },
  ]

  it('successfully purchases product', () => {
    const result = purchaseProduct(1, 1500, products)
    expect(result).toEqual({
      _tag: 'Right',
      right: { product: products[0], remainingBalance: 500 }
    })
  })

  it('returns error for non-existent product', () => {
    const result = purchaseProduct(99, 1000, products)
    expect(result).toEqual({ _tag: 'Left', left: 'Product not found' })
  })

  it('returns error for out of stock product', () => {
    const result = purchaseProduct(2, 1000, products)
    expect(result).toEqual({ _tag: 'Left', left: 'Out of stock' })
  })

  it('returns error for insufficient funds', () => {
    const result = purchaseProduct(1, 500, products)
    expect(result).toEqual({ _tag: 'Left', left: 'Insufficient funds' })
  })
})
