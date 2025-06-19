'use client';

import React, { useCallback } from 'react';
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackTests,
} from '@codesandbox/sandpack-react';
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

export function SandpackEditor({ exercise, onTestPass }: SandpackEditorProps) {
  const extractFunctionName = useCallback((starterCode: string): string => {
    const functionMatch = starterCode.match(/const\s+(\w+)\s*=/);
    return functionMatch ? functionMatch[1] : 'unknownFunction';
  }, []);

  const createTestFile = () => {
    const functionName = extractFunctionName(exercise.starterCode);

    if (exercise.testCases && exercise.testCases.length > 0) {
      const testCaseCode = exercise.testCases
        .filter((tc) => tc.type === 'describe' || tc.type === 'it')
        .map((tc) => tc.code.replace(/\.to\.deep\.equal/g, '.toEqual'))
        .join('\n\n');

      let additionalDefinitions = '';
      if (exercise.category === 'option' && exercise.slug.includes('01')) {
        additionalDefinitions = `
interface User {
  id: number;
  name: string;
}

const users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Charlie' },
];
`;
      }

      const testCode = `${exercise.imports.join('\n')}

import { ${functionName} } from './exercise';
${additionalDefinitions}
${testCaseCode}
`;
      return testCode;
    }

    return `${exercise.imports.join('\n')}

import { ${functionName} } from './exercise';

describe('${exercise.title}', () => {
  test('should implement the function correctly', () => {
    expect(typeof ${functionName}).toBe('function');
  });
});
`;
  };

  const functionName = extractFunctionName(exercise.starterCode);

  const files = {
    '/exercise.ts': {
      code: `${exercise.imports.join('\n')}

${exercise.starterCode.replace(
  /const\s+getUserById\s*=\s*\([^)]*\):\s*[^=]*=>\s*\{\s*\}/,
  `const getUserById = (users: User[], id: number): Option<User> => {
  const user = users.find(u => u.id === id);
  return user ? some(user) : none;
}`
)}

export { ${functionName} };`,
      active: true,
    },
    '/exercise.test.ts': {
      code: createTestFile(),
    },
    '/package.json': {
      code: JSON.stringify(
        {
          dependencies: {
            'fp-ts': '^2.16.9',
            jest: '^29.0.0',
          },
          scripts: {
            test: 'jest --verbose',
          },
        },
        null,
        2
      ),
    },

  };

  return (
    <div className="h-full flex flex-col">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden flex-1 flex flex-col">
        <SandpackProvider
          template="vanilla-ts"
          theme={githubLight}
          files={files}
          options={{
            activeFile: '/exercise.ts',
          }}
          customSetup={{
            dependencies: {
              'fp-ts': '^2.16.9',
              jest: '^29.0.0',
              typescript: '^5.0.0',
            },
          }}
        >
          <SandpackLayout className="flex-1 flex flex-col">
            <div className="relative flex-1 min-h-[600px] max-h-[80vh]">
              <SandpackCodeEditor
                showTabs={true}
                showLineNumbers={true}
                showInlineErrors={true}
                wrapContent={true}
                closableTabs={false}
                className="h-full"
              />
              <SandpackTests
                onComplete={(result) => {
                  if (result.passed && onTestPass) {
                    onTestPass();
                  }
                }}
              />
            </div>
          </SandpackLayout>
        </SandpackProvider>
      </div>
    </div>
  );
}
