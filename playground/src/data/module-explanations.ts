/**
 * Detailed explanations for each module with inline code examples
 */

interface ModuleExplanation {
  description: string
  inlineExample: string
}

export const moduleExplanations: Record<string, ModuleExplanation> = {
  option: {
    description: `Option is your first step into functional programming. It elegantly handles values that might be absent, eliminating null pointer exceptions and making your code more robust. Instead of using null or undefined, which can cause runtime errors, Option forces you to explicitly handle both cases at compile time.`,
    inlineExample: `// Instead of this:
const user = getUser() // might be null!

// Use this:
const user: Option<User> = getUser()`,
  },
  either: {
    description: `Either is a data type that represents a choice between two values: Left (conventionally used for errors) and Right (for success values). Unlike exceptions, Either makes error handling explicit and type-safe.`,
    inlineExample: `// Traditional error handling:
try { const user = getUser() } catch (e) { }

// Either approach:
const user: Either<Error, User> = getUser()`,
  },
  pipe: {
    description: `Pipe is a function that allows you to compose operations in a left-to-right, top-to-bottom manner. Instead of nesting function calls or creating intermediate variables, pipe lets you express transformations as a readable sequence of steps.`,
    inlineExample: `// Instead of this:
const result = c(b(a(value)))

// Use this:
const result = pipe(value, a, b, c)`,
  },
  flow: {
    description: `Flow creates reusable function pipelines by composing functions together. Unlike pipe which processes a value immediately, flow creates a new function that can be used anywhere. This is perfect for creating reusable transformation pipelines.`,
    inlineExample: `// Instead of repeating logic:
const process1 = (x) => c(b(a(x)))
const process2 = (x) => c(b(a(x)))

// Use flow:
const process = flow(a, b, c)`,
  },
  array: {
    description: `The Array module provides functional operations for working with arrays. These operations are immutable (never modify the original array), composable (easily chain operations together), and type-safe (full TypeScript inference).`,
    inlineExample: `// Instead of this:
const result = []
for (let i = 0; i < arr.length; i++) { ... }

// Use this:
const result = pipe(arr, A.map(...), A.filter(...))`,
  },
  record: {
    description: `Record provides functional utilities for working with JavaScript objects (key-value pairs). Transform, filter, and manipulate objects immutably with full type safety. Perfect for configuration objects, dictionaries, and any key-value data.`,
    inlineExample: `// Instead of this:
const result = {}
for (const key in obj) { result[key] = ... }

// Use this:
const result = pipe(obj, R.map(...), R.filter(...))`,
  },
  taskeither: {
    description: `TaskEither combines asynchronous operations (like Promise) with explicit error handling (like Either). It's the go-to type for real-world applications that make API calls, read files, or perform any async operation that might fail.`,
    inlineExample: `// Instead of try-catch:
try { const data = await fetch(...) } catch (e) { }

// Use TaskEither:
const data: TaskEither<Error, Data> = fetchData()`,
  },
  semigroup: {
    description: `A Semigroup is a type that has a way to combine two values into one (called concat). It's associative, meaning the order of operations doesn't matter. Perfect for merging configurations, combining validation results, or aggregating data.`,
    inlineExample: `// Instead of manual merging:
const merged = { ...obj1, ...obj2 }

// Use Semigroup:
const merged = Semigroup.concat(obj1, obj2)`,
  },
  monoid: {
    description: `A Monoid is a Semigroup with an identity element (called empty). This means you can safely reduce empty arrays and have a meaningful default value. Essential for aggregation operations like sum, concatenation, and merging.`,
    inlineExample: `// Instead of manual empty checks:
if (arr.length === 0) return 0
return arr.reduce((a, b) => a + b)

// Use Monoid:
const sum = M.concatAll(M.MonoidSum)(arr)`,
  },
  validation: {
    description: `Validation is like Either, but instead of short-circuiting on the first error, it accumulates all errors. This is perfect for form validation where you want to show users all validation errors at once, not just the first one.`,
    inlineExample: `// Either stops at first error:
E.chain(validateEmail) // stops here if error

// Validation collects all errors:
V.map3(validateEmail, validateName, validateAge)`,
  },
  nonemptyarray: {
    description: `NonEmptyArray is an array that is guaranteed to have at least one element. This means operations like head, last, max, and min are always safe - they can never fail. Express this constraint in your types instead of checking at runtime.`,
    inlineExample: `// Instead of runtime checks:
if (arr.length === 0) return undefined
return arr[0]

// Use NonEmptyArray:
const first = NEA.head(arr) // always works!`,
  },
  task: {
    description: `Task represents a lazy asynchronous computation that always succeeds. Unlike Promise which executes immediately, Task only runs when you explicitly call it. This gives you control over when effects happen and makes testing easier.`,
    inlineExample: `// Promise executes immediately:
const data = fetch('/api') // already running!

// Task is lazy:
const data = T.of(() => fetch('/api'))
data() // runs now`,
  },
  ord: {
    description: `Ord defines how to compare and order values of a type. Create custom sorting logic, find min/max values, and compose orderings together. Type-safe comparisons that work with any data structure.`,
    inlineExample: `// Instead of manual comparisons:
arr.sort((a, b) => a.age - b.age)

// Use Ord:
const byAge = pipe(N.Ord, Ord.contramap((u: User) => u.age))
const sorted = A.sort(byAge)(arr)`,
  },
  reader: {
    description: `Reader provides dependency injection without global state. Pass configuration or dependencies through your entire program without globals. Makes your code more testable and explicit about what it needs.`,
    inlineExample: `// Instead of globals:
const config = getGlobalConfig()
function doWork() { use(config) }

// Use Reader:
const doWork: Reader<Config, Result> = R.asks(...)`,
  },
  readertaskeither: {
    description: `ReaderTaskEither combines three powerful patterns: Reader for dependency injection, Task for async operations, and Either for error handling. This is the ultimate type for production applications that need all three.`,
    inlineExample: `// Instead of mixing concerns:
async function process(id) {
  const config = global.config
  try { ... } catch (e) { ... }
}

// Use RTE:
const process: RTE<Config, Error, Result> = ...`,
  },
  io: {
    description: `IO represents a synchronous side effect that you can control. Like Task but for sync operations. Defer file I/O, console logging, or any side effect until you're ready to execute it. Perfect for testing and controlling when effects happen.`,
    inlineExample: `// Effect runs immediately:
fs.writeFileSync('data.txt', data)

// IO defers the effect:
const write = IO.of(() => fs.writeFileSync(...))
write() // runs when you want`,
  },
  these: {
    description: `These represents three possible states: Left (error), Right (success), or Both (success with warnings). More powerful than Either when you need to return both a result and warnings or metadata. Perfect for validation with warnings.`,
    inlineExample: `// Either can't represent warnings:
return hasWarnings ? E.left(warnings) : E.right(data)

// These can handle both:
return TH.both(warnings, data)`,
  },
}
