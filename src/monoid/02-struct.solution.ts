import * as M from 'fp-ts/Monoid'
import * as N from 'fp-ts/number'
import * as Str from 'fp-ts/string'
import { describe, it, expect } from 'vitest'

type ShoppingCart = {
  items: number
  totalPrice: number
  couponCode: string
}

const ShoppingCartMonoid: M.Monoid<ShoppingCart> = M.struct({
  items: N.MonoidSum,
  totalPrice: N.MonoidSum,
  couponCode: Str.Monoid,
})

export const combineCart = (carts: ShoppingCart[]): ShoppingCart =>
  M.concatAll(ShoppingCartMonoid)(carts)

//TESTS
describe('Monoid struct', () => {
  it('combines multiple carts', () => {
    const carts = [
      { items: 3, totalPrice: 50, couponCode: '' },
      { items: 2, totalPrice: 30, couponCode: 'SAVE10' },
      { items: 1, totalPrice: 20, couponCode: '' },
    ]
    const result = combineCart(carts)
    expect(result).toEqual({
      items: 6,
      totalPrice: 100,
      couponCode: 'SAVE10',
    })
  })

  it('handles empty array', () => {
    const result = combineCart([])
    expect(result).toEqual({
      items: 0,
      totalPrice: 0,
      couponCode: '',
    })
  })

  it('handles single cart', () => {
    const result = combineCart([{ items: 5, totalPrice: 75, couponCode: 'FIRST' }])
    expect(result).toEqual({ items: 5, totalPrice: 75, couponCode: 'FIRST' })
  })
})
