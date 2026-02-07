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

// @ts-ignore
const getCurrentUserName = (): R.Reader<AppContext, string> => {
  //TODO:
  //Use R.ask() to get the entire AppContext, then use R.map to extract the currentUser.name
  //Hint: pipe(R.ask<AppContext>(), R.map(ctx => ctx.currentUser.name))
}

// @ts-ignore
const getCurrentUserEmail = (): R.Reader<AppContext, string> => {
  //TODO:
  //Similar to above, extract the currentUser.email from the context
}

// @ts-ignore
const isCurrentUserAdmin = (): R.Reader<AppContext, boolean> => {
  //TODO:
  //Extract the isAdmin flag from the context
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
