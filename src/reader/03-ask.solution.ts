import * as R from 'fp-ts/Reader'
import { describe, it, expect } from 'vitest'
import { pipe } from 'fp-ts/function'

interface User {
  id: number
  name: string
  email: string
}

interface AppContext {
  currentUser: User
  isAdmin: boolean
}

export const getCurrentUserName = (): R.Reader<AppContext, string> => {
  return pipe(
    R.ask<AppContext>(),
    R.map(ctx => ctx.currentUser.name)
  )
}

export const getCurrentUserEmail = (): R.Reader<AppContext, string> => {
  return pipe(
    R.ask<AppContext>(),
    R.map(ctx => ctx.currentUser.email)
  )
}

export const isCurrentUserAdmin = (): R.Reader<AppContext, boolean> => {
  return pipe(
    R.ask<AppContext>(),
    R.map(ctx => ctx.isAdmin)
  )
}

//TESTS
describe('Reader ask', () => {
  const context: AppContext = {
    currentUser: {
      id: 1,
      name: 'Alice',
      email: 'alice@example.com',
    },
    isAdmin: true,
  }

  it('gets current user name', () => {
    expect(getCurrentUserName()(context)).toBe('Alice')
  })

  it('gets current user email', () => {
    expect(getCurrentUserEmail()(context)).toBe('alice@example.com')
  })

  it('checks if user is admin', () => {
    expect(isCurrentUserAdmin()(context)).toBe(true)
  })

  it('works with non-admin user', () => {
    const userContext = { ...context, isAdmin: false }
    expect(isCurrentUserAdmin()(userContext)).toBe(false)
  })
})
