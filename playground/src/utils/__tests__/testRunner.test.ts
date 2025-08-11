import { describe, it, expect } from 'vitest'
import { testRunner } from '@/utils/testRunner'

describe('TestRunner', () => {
  it('should detect unimplemented functions', async () => {
    const code = `
      // @ts-ignore
      const myFunction = () => {
        // TODO: implement this
      }
    `
    
    const result = await testRunner.runCode(code)
    expect(result.passed).toBe(false)
    expect(result.results[0].message).toContain('not implemented')
  })

  it('should pass for implemented functions', async () => {
    const code = `
      const myFunction = () => {
        return 'hello world'
      }
    `
    
    const result = await testRunner.runCode(code)
    expect(result.passed).toBe(true)
  })
})
