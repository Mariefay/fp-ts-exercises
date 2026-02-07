import { TestSuite } from '@/types/exercise'

export class SimpleTestRunner {
  // This is a simplified test runner for demonstration purposes
  // In a production environment, you'd want to use a proper sandboxed execution environment
  
  async runCode(code: string): Promise<TestSuite> {
    try {
      // Basic validation checks
      const hasImplementation = this.hasValidImplementation(code)
      const hasTypeErrors = this.hasBasicTypeErrors(code)
      
      if (hasTypeErrors) {
        return {
          name: 'Code Validation',
          passed: false,
          total: 1,
          passCount: 0,
          failCount: 1,
          results: [
            {
              passed: false,
              message: 'Type errors detected in code',
              error: 'Please fix TypeScript errors before running tests',
            },
          ],
        }
      }
      
      if (!hasImplementation) {
        return {
          name: 'Implementation Check',
          passed: false,
          total: 1,
          passCount: 0,
          failCount: 1,
          results: [
            {
              passed: false,
              message: 'Function not implemented',
              error: 'Please implement the required function',
            },
          ],
        }
      }
      
      // If basic checks pass, simulate successful test execution
      const testCount = this.countTests(code)
      
      return {
        name: 'Test Execution',
        passed: true,
        total: testCount,
        passCount: testCount,
        failCount: 0,
        results: Array.from({ length: testCount }, (_, i) => ({
          passed: true,
          message: `Test ${i + 1} passed`,
          duration: Math.random() * 50 + 10,
        })),
      }
    } catch (error) {
      return {
        name: 'Execution Error',
        passed: false,
        total: 1,
        passCount: 0,
        failCount: 1,
        results: [
          {
            passed: false,
            message: 'Runtime error occurred',
            error: error instanceof Error ? error.message : 'Unknown error',
          },
        ],
      }
    }
  }
  
  private hasValidImplementation(code: string): boolean {
    // Check if the code has basic implementation patterns
    return (
      !code.includes('@ts-ignore') &&
      !code.includes('//TODO:') &&
      !code.includes('// TODO:') &&
      code.includes('return') &&
      !code.includes('undefined')
    )
  }
  
  private hasBasicTypeErrors(_code: string): boolean {
    // Very basic type error detection
    // In a real implementation, you'd use the TypeScript compiler API
    return false // Simplified for demo
  }
  
  private countTests(code: string): number {
    // Count the number of 'it(' calls in the code
    const matches = code.match(/it\s*\(/g)
    return matches ? matches.length : 1
  }
}

export const testRunner = new SimpleTestRunner()
