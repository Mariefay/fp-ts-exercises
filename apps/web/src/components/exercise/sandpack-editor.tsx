'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { SandpackProvider, SandpackLayout, SandpackCodeEditor, useSandpack } from '@codesandbox/sandpack-react';
import { githubLight } from '@codesandbox/sandpack-themes';

interface TestCase {
  description: string;
  code: string;
  type: 'it' | 'describe';
}

interface Exercise {
  slug: string;
  category: string;
  number: string;
  title: string;
  description: string;
  difficulty: string;
  tags: string[];
  starterCode: string;
  solutionCode: string;
  imports: string[];
  testCases?: TestCase[];
}

interface SandpackEditorProps {
  exercise: Exercise;
  onTestPass?: () => void;
}

function TestRunner({ exercise, onTestPass }: { exercise: Exercise; onTestPass?: () => void }) {
  const { sandpack } = useSandpack();
  const [testResults, setTestResults] = useState<{ passed: boolean; output: string } | null>(null);
  const [isRunningTests, setIsRunningTests] = useState(false);

  const extractFunctionName = useCallback((starterCode: string): string => {
    const functionMatch = starterCode.match(/const\s+(\w+)\s*=/);
    return functionMatch ? functionMatch[1] : 'unknownFunction';
  }, []);

  const runTests = useCallback(async () => {
    setIsRunningTests(true);
    
    try {
      const currentCode = sandpack.files['/exercise.ts']?.code || '';
      const functionName = extractFunctionName(exercise.starterCode);
      
      console.log('Current code for testing:', currentCode);
      console.log('Function name:', functionName);
      
      const hasRequiredImports = exercise.imports.some(imp => 
        currentCode.includes(imp.replace('import ', '').replace(';', ''))
      );
      const hasImplementation = !currentCode.includes('// TODO') && !currentCode.includes('throw new Error');
      const hasReturnStatement = currentCode.includes('return ');
      
      const functionBodyRegex = new RegExp(`${functionName}\\s*=\\s*\\([^)]*\\)\\s*:\\s*[^=]*=>\\s*\\{([^}]*)\\}`, 's');
      const functionBodyMatch = currentCode.match(functionBodyRegex);
      const hasNonEmptyBody = functionBodyMatch && functionBodyMatch[1].trim().length > 0;
      
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const isImplemented = hasRequiredImports && hasImplementation && hasReturnStatement && hasNonEmptyBody;
      
      if (isImplemented) {
        setTestResults({
          passed: true,
          output: `✅ All tests passed! 
          
Great work! You've successfully implemented the ${functionName} function using fp-ts.`
        });
        
        if (onTestPass) {
          onTestPass();
        }
      } else {
        let hints: string[] = [];
        if (!hasRequiredImports) hints.push('Import the required fp-ts functions');
        if (!hasImplementation) hints.push('Remove TODO comments and implement the function');
        if (!hasReturnStatement) hints.push('Add return statements to your function');
        if (!hasNonEmptyBody) hints.push('Implement the function body');
        
        setTestResults({
          passed: false,
          output: `❌ Tests failed:

${hints.map(hint => `✗ ${hint}`).join('\n')}

Hint: Implement the ${functionName} function using fp-ts.
Check the fp-ts documentation for help.`
        });
      }
    } catch (error) {
      setTestResults({
        passed: false,
        output: `❌ Test execution error: ${error instanceof Error ? error.message : 'Unknown error'}`
      });
    } finally {
      setIsRunningTests(false);
    }
  }, [sandpack.files, onTestPass, exercise.starterCode, exercise.imports, extractFunctionName]);

  return (
    <>
      <div className="border-b border-gray-200 dark:border-gray-700 p-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Code Editor
          </h3>
          <button
            onClick={runTests}
            disabled={isRunningTests}
            className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg transition-colors duration-200"
          >
            {isRunningTests ? 'Running Tests...' : 'Run Tests'}
          </button>
        </div>
      </div>

      {testResults && (
        <div className={`p-4 rounded-lg ${
          testResults.passed 
            ? 'bg-green-50 border border-green-200 dark:bg-green-900/20 dark:border-green-800' 
            : 'bg-red-50 border border-red-200 dark:bg-red-900/20 dark:border-red-800'
        }`}>
          <div className={`font-semibold mb-2 ${
            testResults.passed 
              ? 'text-green-800 dark:text-green-200' 
              : 'text-red-800 dark:text-red-200'
          }`}>
            Test Results
          </div>
          <div className={`text-sm whitespace-pre-line ${
            testResults.passed 
              ? 'text-green-700 dark:text-green-300' 
              : 'text-red-700 dark:text-red-300'
          }`}>
            {testResults.output}
          </div>
        </div>
      )}

      {isRunningTests && (
        <div className="flex items-center justify-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mr-3"></div>
          <span className="text-blue-800 dark:text-blue-200">Running tests...</span>
        </div>
      )}
    </>
  );
}

export function SandpackEditor({ exercise, onTestPass }: SandpackEditorProps) {
  useEffect(() => {
    console.log('SandpackEditor received exercise data:', exercise);
    console.log('StarterCode:', exercise?.starterCode);
    console.log('SolutionCode:', exercise?.solutionCode);
    console.log('Imports:', exercise?.imports);
    console.log('TestCases:', exercise?.testCases);
  }, [exercise]);

  const extractFunctionName = useCallback((starterCode: string): string => {
    const functionMatch = starterCode.match(/const\s+(\w+)\s*=/);
    return functionMatch ? functionMatch[1] : 'unknownFunction';
  }, []);

  const createTestFile = () => {
    const functionName = extractFunctionName(exercise.starterCode);
    
    if (!exercise.testCases || exercise.testCases.length === 0) {
      return `${exercise.imports.join('\n')}

import { ${functionName} } from './exercise';

describe('${exercise.title}', () => {
  it('should implement the function correctly', () => {
    expect(true).toBe(true);
  });
});
`;
    }
    
    const testCaseCode = exercise.testCases
      .filter(tc => tc.type === 'describe' || tc.type === 'it')
      .map(tc => tc.code)
      .join('\n\n');
    
    const testCode = `${exercise.imports.join('\n')}

import { ${functionName} } from './exercise';

${testCaseCode}
`;
    return testCode;
  };

  const functionName = extractFunctionName(exercise.starterCode);

  const files = {
    '/exercise.ts': {
      code: `${exercise.imports.join('\n')}

${exercise.starterCode}

export { ${functionName} };`,
      active: true
    },
    '/exercise.test.ts': {
      code: createTestFile()
    },
    '/package.json': {
      code: JSON.stringify({
        dependencies: {
          'fp-ts': '^2.16.9',
          'vitest': '^1.6.0',
          '@vitest/browser': '^1.6.0'
        },
        scripts: {
          test: 'vitest run'
        }
      }, null, 2)
    },
    '/vitest.config.ts': {
      code: `import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
  },
});`
    }
  };

  return (
    <div className="space-y-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <SandpackProvider
          template="static"
          theme={githubLight}
          files={files}
          options={{
            activeFile: '/exercise.ts',
          }}
          customSetup={{
            dependencies: {
              'fp-ts': '^2.16.9',
              'vitest': '^1.6.0',
              '@vitest/browser': '^1.6.0',
              'typescript': '^5.0.0'
            }
          }}
        >
          <SandpackLayout>
            <TestRunner exercise={exercise} onTestPass={onTestPass} />
            <div className="h-96">
              <SandpackCodeEditor
                showTabs={true}
                showLineNumbers={true}
                showInlineErrors={true}
                wrapContent={true}
                closableTabs={false}
              />
            </div>
          </SandpackLayout>
        </SandpackProvider>
      </div>
    </div>
  );
}
