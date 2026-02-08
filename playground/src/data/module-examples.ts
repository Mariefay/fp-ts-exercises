/**
 * Code examples showing traditional approach vs fp-ts approach for each module
 */

interface CodeExample {
  traditional: {
    title: string
    code: string
  }
  fpts: {
    title: string
    code: string
  }
}

export const moduleExamples: Record<string, CodeExample> = {
  option: {
    traditional: {
      title: '❌ Traditional Approach',
      code: `function getUser(id: number): User | null {
  return users.find(u => u.id === id) ?? null
}

const user = getUser(1)
if (user !== null) {
  console.log(user.name) // Might still crash!
} else {
  console.log('User not found')
}`,
    },
    fpts: {
      title: '✅ Option Approach',
      code: `function getUser(id: number): Option<User> {
  const user = users.find(u => u.id === id)
  return user ? O.some(user) : O.none
}

const result = pipe(
  getUser(1),
  O.fold(
    () => 'User not found',
    user => user.name
  )
) // Type safe and elegant!`,
    },
  },
  either: {
    traditional: {
      title: '❌ Traditional Approach',
      code: `function divide(a: number, b: number): number {
  if (b === 0) {
    throw new Error('Division by zero')
  }
  return a / b
}

try {
  const result = divide(10, 0)
  console.log(result)
} catch (error) {
  console.error(error.message)
}`,
    },
    fpts: {
      title: '✅ Either Approach',
      code: `function divide(a: number, b: number): Either<string, number> {
  return b === 0
    ? E.left('Division by zero')
    : E.right(a / b)
}

pipe(
  divide(10, 0),
  E.fold(
    error => console.error(error),
    result => console.log(result)
  )
) // Errors are values!`,
    },
  },
  pipe: {
    traditional: {
      title: '❌ Nested Functions',
      code: `const result = formatOutput(
  transform(
    validate(
      parseInput(userInput)
    )
  )
)

// Hard to read, inside-out flow
// Difficult to debug
// Adding steps is awkward`,
    },
    fpts: {
      title: '✅ Pipe Approach',
      code: `const result = pipe(
  userInput,
  parseInput,
  validate,
  transform,
  formatOutput
)

// Left-to-right, natural flow
// Easy to read and debug
// Adding steps is simple`,
    },
  },
  flow: {
    traditional: {
      title: '❌ Manual Composition',
      code: `const processUser = (user: User) => {
  const validated = validate(user)
  const transformed = transform(validated)
  return format(transformed)
}

// Can't reuse easily
// Repeating logic everywhere`,
    },
    fpts: {
      title: '✅ Flow Approach',
      code: `const processUser = flow(
  validate,
  transform,
  format
)

// Reusable pipeline
// Point-free style
// Compose anywhere`,
    },
  },
  array: {
    traditional: {
      title: '❌ Imperative Loops',
      code: `const result = []
for (let i = 0; i < numbers.length; i++) {
  if (numbers[i] % 2 === 0) {
    result.push(numbers[i] * 2)
  }
}

// Mutations, loops, hard to read`,
    },
    fpts: {
      title: '✅ Array Operations',
      code: `const result = pipe(
  numbers,
  A.filter(n => n % 2 === 0),
  A.map(n => n * 2)
)

// Declarative, composable, clear`,
    },
  },
  record: {
    traditional: {
      title: '❌ Manual Object Iteration',
      code: `const result: Record<string, number> = {}
for (const key in obj) {
  result[key] = obj[key] * 2
}

// Mutations, verbose
// Error-prone`,
    },
    fpts: {
      title: '✅ Record Operations',
      code: `const result = pipe(
  obj,
  R.map(value => value * 2)
)

// Immutable, functional
// Type-safe transformations`,
    },
  },
  taskeither: {
    traditional: {
      title: '❌ Try-Catch Hell',
      code: `async function getUser(id: number) {
  try {
    const response = await fetch(\`/api/users/\${id}\`)
    const user = await response.json()
    return user
  } catch (error) {
    console.error(error)
    return null
  }
}`,
    },
    fpts: {
      title: '✅ TaskEither Approach',
      code: `const getUser = (id: number): TaskEither<Error, User> =>
  pipe(
    TE.tryCatch(
      () => fetch(\`/api/users/\${id}\`),
      E.toError
    ),
    TE.chain(res => TE.tryCatch(() => res.json(), E.toError))
  )

// Errors in types, composable`,
    },
  },
  semigroup: {
    traditional: {
      title: '❌ Manual Merging',
      code: `const merge = (a: Settings, b: Settings): Settings => ({
  theme: b.theme || a.theme,
  language: b.language || a.language,
  notifications: b.notifications || a.notifications
})

// Repetitive, error-prone`,
    },
    fpts: {
      title: '✅ Semigroup Approach',
      code: `const SettingsSemigroup = S.struct({
  theme: S.first<string>(),
  language: S.first<string>(),
  notifications: S.first<boolean>()
})

const merge = SettingsSemigroup.concat
// Declarative, reusable`,
    },
  },
  monoid: {
    traditional: {
      title: '❌ Manual Reduction',
      code: `function sum(numbers: number[]): number {
  if (numbers.length === 0) return 0
  return numbers.reduce((a, b) => a + b)
}

// Manual empty case handling`,
    },
    fpts: {
      title: '✅ Monoid Approach',
      code: `const sum = M.concatAll(M.MonoidSum)

sum([1, 2, 3]) // 6
sum([]) // 0 (uses empty value)

// Handles empty automatically`,
    },
  },
  validation: {
    traditional: {
      title: '❌ Early Exit',
      code: `function validateForm(data: FormData) {
  if (!data.email) return ['Email required']
  if (!data.name) return ['Name required']
  if (!data.age) return ['Age required']
  return []
}

// Shows only first error`,
    },
    fpts: {
      title: '✅ Validation Approach',
      code: `const validateForm = (data: FormData) =>
  pipe(
    sequenceS(V.Validation)(Apply)({
      email: validateEmail(data.email),
      name: validateName(data.name),
      age: validateAge(data.age)
    })
  )

// Accumulates all errors`,
    },
  },
  nonemptyarray: {
    traditional: {
      title: '❌ Runtime Checks',
      code: `function getFirst(arr: number[]): number | undefined {
  if (arr.length === 0) {
    return undefined
  }
  return arr[0]
}

// Always need to check length`,
    },
    fpts: {
      title: '✅ NonEmptyArray Approach',
      code: `function getFirst(arr: NonEmptyArray<number>): number {
  return NEA.head(arr)
}

// Guaranteed non-empty in types
// No runtime checks needed`,
    },
  },
  task: {
    traditional: {
      title: '❌ Eager Promises',
      code: `const fetchData = fetch('/api/data')

// Executes immediately
// Can't control when it runs
// Hard to test`,
    },
    fpts: {
      title: '✅ Task Approach',
      code: `const fetchData = T.of(() => fetch('/api/data'))

// Lazy evaluation
// Controlled execution
const result = fetchData() // Run when needed`,
    },
  },
  ord: {
    traditional: {
      title: '❌ Manual Comparisons',
      code: `users.sort((a, b) => {
  if (a.age < b.age) return -1
  if (a.age > b.age) return 1
  return 0
})

// Verbose, repetitive`,
    },
    fpts: {
      title: '✅ Ord Approach',
      code: `const byAge = pipe(
  N.Ord,
  Ord.contramap((user: User) => user.age)
)

const sorted = A.sort(byAge)(users)
// Composable, reusable`,
    },
  },
  reader: {
    traditional: {
      title: '❌ Global Config',
      code: `const globalConfig = { apiUrl: '...' }

function getUser(id: number) {
  return fetch(\`\${globalConfig.apiUrl}/users/\${id}\`)
}

// Global state, hard to test`,
    },
    fpts: {
      title: '✅ Reader Approach',
      code: `const getUser = (id: number): Reader<Config, Promise<User>> =>
  R.asks(config =>
    fetch(\`\${config.apiUrl}/users/\${id}\`)
  )

// Dependency injection, testable`,
    },
  },
  readertaskeither: {
    traditional: {
      title: '❌ Mixing Concerns',
      code: `async function processData(id: number) {
  const config = getGlobalConfig()
  try {
    const data = await fetchData(config, id)
    return transform(data)
  } catch (error) {
    return null
  }
}`,
    },
    fpts: {
      title: '✅ ReaderTaskEither',
      code: `const processData = (id: number): RTE<Config, Error, Data> =>
  pipe(
    RTE.ask<Config>(),
    RTE.chain(config => fetchData(config, id)),
    RTE.map(transform)
  )

// DI + Async + Errors all typed`,
    },
  },
  io: {
    traditional: {
      title: '❌ Direct Side Effects',
      code: `function saveToFile(data: string) {
  fs.writeFileSync('data.txt', data)
  console.log('Saved!')
}

// Executes immediately
// Hard to test`,
    },
    fpts: {
      title: '✅ IO Approach',
      code: `const saveToFile = (data: string): IO<void> =>
  () => {
    fs.writeFileSync('data.txt', data)
    console.log('Saved!')
  }

// Lazy, testable
saveToFile(data)() // Execute when ready`,
    },
  },
  these: {
    traditional: {
      title: '❌ Multiple Return Types',
      code: `function process(data: Data): Result | Error | Both {
  // Complex logic to handle 3 cases
  // Type safety is difficult
}

// Awkward to work with`,
    },
    fpts: {
      title: '✅ These Approach',
      code: `function process(data: Data): These<Error[], Result> {
  return hasWarnings
    ? TH.both(warnings, result)
    : TH.right(result)
}

// Success with warnings supported`,
    },
  },
}
