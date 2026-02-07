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

const ArraySemigroup = <T>(): { concat: (x: T[], y: T[]) => T[] } => ({
  concat: (x, y) => [...x, ...y],
})

const validateAmount = (amount?: number): E.Either<ValidationErrors, number> =>
  amount && amount > 0 ? E.right(amount) : E.left(['Amount must be greater than 0'])

const validateCurrency = (currency?: string): E.Either<ValidationErrors, string> =>
  currency && ['USD', 'EUR', 'GBP'].includes(currency)
    ? E.right(currency)
    : E.left(['Currency must be USD, EUR, or GBP'])

const validateCard = (card: Partial<CreditCard>): E.Either<ValidationErrors, CreditCard> => {
  const applicativeValidation = E.getApplicativeValidation(ArraySemigroup<string>())

  const validateNumber = (number?: string): E.Either<ValidationErrors, string> =>
    number && /^\d{16}$/.test(number) ? E.right(number) : E.left(['Card number must be 16 digits'])

  const validateCVV = (cvv?: string): E.Either<ValidationErrors, string> =>
    cvv && /^\d{3,4}$/.test(cvv) ? E.right(cvv) : E.left(['CVV must be 3 or 4 digits'])

  const validateMonth = (month?: number): E.Either<ValidationErrors, number> =>
    month && month >= 1 && month <= 12 ? E.right(month) : E.left(['Expiry month must be 1-12'])

  const validateYear = (year?: number): E.Either<ValidationErrors, number> =>
    year && year >= new Date().getFullYear()
      ? E.right(year)
      : E.left(['Expiry year must be current year or later'])

  return pipe(
    A.sequenceT(applicativeValidation)(
      validateNumber(card.number),
      validateCVV(card.cvv),
      validateMonth(card.expiryMonth),
      validateYear(card.expiryYear)
    ),
    E.map(([number, cvv, expiryMonth, expiryYear]) => ({ number, cvv, expiryMonth, expiryYear }))
  )
}

const validateBillingName = (name?: string): E.Either<ValidationErrors, string> =>
  name && name.length > 0 ? E.right(name) : E.left(['Billing name is required'])

export const validatePaymentRequest = (request: Partial<PaymentRequest & { card: Partial<CreditCard> }>): E.Either<ValidationErrors, PaymentRequest> => {
  const applicativeValidation = E.getApplicativeValidation(ArraySemigroup<string>())

  return pipe(
    A.sequenceT(applicativeValidation)(
      validateAmount(request.amount),
      validateCurrency(request.currency),
      validateCard(request.card || {}),
      validateBillingName(request.billingName)
    ),
    E.map(([amount, currency, card, billingName]) => ({ amount, currency, card, billingName }))
  )
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
