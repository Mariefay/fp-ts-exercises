import * as E from 'fp-ts/Either'
import * as A from 'fp-ts/Apply'
import { pipe } from 'fp-ts/function'
import { describe, it, expect } from 'vitest'

type ValidationErrors = string[]

type CreditCard = {
  number: string
  cvv: string
  expiryMonth: number
  expiryYear: number
}

type PaymentRequest = {
  amount: number
  currency: string
  card: CreditCard
  billingName: string
}

// @ts-ignore
const validatePaymentRequest = (request: Partial<PaymentRequest & { card: Partial<CreditCard> }>): E.Either<ValidationErrors, PaymentRequest> => {
  //TODO: Validate complete payment request:
  // - amount: > 0
  // - currency: USD, EUR, or GBP
  // - card.number: 16 digits
  // - card.cvv: 3 or 4 digits
  // - card.expiryMonth: 1-12
  // - card.expiryYear: >= current year
  // - billingName: non-empty
  //HINT: Break into smaller validators, combine with applicative
}

//TESTS
describe('Real-world validation', () => {
  it('validates complete payment request', () => {
    const request = {
      amount: 100,
      currency: 'USD',
      card: {
        number: '1234567812345678',
        cvv: '123',
        expiryMonth: 12,
        expiryYear: 2026,
      },
      billingName: 'Alice Johnson',
    }
    const result = validatePaymentRequest(request)
    expect(result._tag).toBe('Right')
  })

  it('accumulates all payment validation errors', () => {
    const request = {
      amount: -50,
      currency: 'INVALID',
      card: {
        number: '123',
        cvv: '12345',
        expiryMonth: 13,
        expiryYear: 2020,
      },
      billingName: '',
    }
    const result = validatePaymentRequest(request)
    expect(result._tag).toBe('Left')
    if (result._tag === 'Left') {
      expect(result.left.length).toBeGreaterThan(5)
    }
  })
})
