import * as TE from 'fp-ts/TaskEither'
import { pipe } from 'fp-ts/function'
import { describe, it, expect } from 'vitest'

export const fetchWithFallback = (primaryUrl: string, fallbackUrl: string): TE.TaskEither<string, string> => {
  const fetchPrimary = TE.tryCatch(
    () => fetch(primaryUrl).then(res => res.text()),
    () => 'Primary failed'
  )

  const fetchFallback = TE.tryCatch(
    () => fetch(fallbackUrl).then(res => res.text()),
    () => 'Both failed'
  )

  return pipe(
    fetchPrimary,
    TE.orElse(() => fetchFallback)
  )
}

export const retryOnce = (task: TE.TaskEither<string, number>): TE.TaskEither<string, number> =>
  pipe(
    task,
    TE.orElse(() => task)
  )

//TESTS
describe('TaskEither recovery', () => {
  it('retries task on failure', async () => {
    let attempts = 0
    const task = TE.tryCatch(
      async () => {
        attempts++
        if (attempts === 1) throw new Error('First attempt')
        return 42
      },
      () => 'failed'
    )

    const result = await retryOnce(task)()
    expect(result._tag).toBe('Right')
    expect(attempts).toBe(2)
  })

  it('succeeds on first attempt', async () => {
    let attempts = 0
    const task = TE.tryCatch(
      async () => {
        attempts++
        return 100
      },
      () => 'failed'
    )

    const result = await retryOnce(task)()
    expect(result._tag).toBe('Right')
    expect(attempts).toBe(1)
  })
})
