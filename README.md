# fp-ts-exercises

Interactive exercises to learn functional programming in TypeScript using the fp-ts library.

🎯 **Two Ways to Learn**: Practice with either the CLI exercise runner or the interactive web playground!

## 🚀 Quick Start

### Requirements

- Node.js >= 18.0.0
- npm >= 8.0.0

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/Mariefay/fp-ts-exercises.git
   cd fp-ts-exercises
   ```

2. Install dependencies
   ```bash
   npm install
   ```

## 📚 Learning Paths

This project offers **two ways** to learn fp-ts:

### 1. CLI Interactive Exercises

Perfect for practicing in your terminal with instant feedback and watch mode.

**Run an exercise:**
```bash
npm run exercise -- <module> <exercise_number>
```

**Example:**
```bash
npm run exercise -- option 01
```

The CLI runner will:
- ✅ Type-check your code with TypeScript
- ✅ Run tests to verify your solution
- ✅ Watch for changes and re-run automatically
- ✅ Show clear, helpful error messages

**View the solution:**
```bash
npm run solution -- option 01
```

**List all available exercises:**
```bash
npm run exercise -- help
```

### 2. Web Playground

An interactive browser-based learning environment with real-time feedback and progress tracking.

**Start the playground:**
```bash
cd playground
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

**Playground Features:**
- 🎨 Beautiful, modern UI with syntax highlighting
- ✅ Real-time test execution in the browser
- 📊 Progress tracking with localStorage persistence
- 🎯 Dashboard to visualize your learning journey
- 🔄 Instant feedback on your code
- 💡 Hints and tips for each exercise
- 🎓 Navigate between exercises seamlessly

## 📖 Exercise Modules

This project contains **118 exercises** across 18 fp-ts modules:

### Option (10 exercises)
Learn to handle nullable values safely without null/undefined.

- `01-some-and-none` - Basic Option creation
- `02-of` - Creating Options with `of`
- `03-from-predicate` - Conditional Option creation
- `04-fold` - Pattern matching with fold
- `05-from-nullable` - Converting nullable values
- `06-to-nullable` - Converting to nullable
- `07-to-undefined` - Converting to undefined
- `08-get-or-else` - Providing default values
- `09-filter` - Filtering Options
- `10-from-either` - Converting from Either

### Either (8 exercises)
Master error handling with functional Either types.

- `01-left-and-right` - Creating Either values
- `02-from-predicate` - Conditional Either creation
- `03-fold` - Pattern matching on Either
- `04-map` - Mapping over Right values
- `05-chain` - Chaining Either operations
- `06-error-handling` - Practical error handling
- `07-validation` - Form validation
- `08-combining-eithers` - Working with multiple Eithers

### Pipe (5 exercises)
Learn powerful function composition with pipe.

- `01-basic-pipe` - Introduction to pipe
- `02-multi-step` - Chaining multiple operations
- `03-with-either` - Pipe with Either types
- `04-array-operations` - Complex array pipelines
- `05-real-world` - Practical data transformations

### Flow (5 exercises)
Create reusable function pipelines with flow.

- `01-basic-flow` - Introduction to flow
- `02-composition` - Function composition patterns
- `03-composing-flows` - Building reusable flows
- `04-with-fp-ts` - Flow with fp-ts types
- `05-practical-example` - Real-world use cases

### Array (10 exercises)
Master functional array operations and data transformations.

- `01-map` - Transforming arrays
- `02-filter` - Filtering arrays
- `03-reduce` - Reducing arrays
- `04-find` - Finding elements
- `05-partition` - Partitioning arrays
- `06-sort` - Sorting arrays
- `07-chaining` - Chaining operations
- `08-flatmap` - Flattening and mapping
- `09-compact` - Removing None values
- `10-pipeline` - Complex pipelines

### TaskEither (10 exercises)
Async operations with error handling for real-world applications.

- `01-basic` - Creating TaskEither values
- `02-from-promise` - Converting promises
- `03-chaining` - Chaining async operations
- `04-map` - Mapping over TaskEither
- `05-fold` - Pattern matching
- `06-recovery` - Error recovery
- `07-sequencing` - Sequential operations
- `08-parallel` - Parallel execution
- `09-api` - API calls
- `10-pipeline` - Complex pipelines

### Record (8 exercises)
Work with objects and dictionaries functionally.

- `01-map` - Transforming records
- `02-filter` - Filtering records
- `03-collect` - Converting to arrays
- `04-lookup` - Safe property access
- `05-modify` - Updating records
- `06-keys-values` - Working with keys/values
- `07-merge` - Merging records
- `08-pipeline` - Record pipelines

### Semigroup (4 exercises)
Combine values systematically with the concat operation.

- `01-basic` - Basic semigroups
- `02-struct` - Combining structures
- `03-first-last` - First/last semigroups
- `04-practical` - Practical examples

### Monoid (4 exercises)
Semigroup with identity - handle empty cases elegantly.

- `01-basic` - Basic monoids
- `02-struct` - Combining structures
- `03-custom` - Custom monoids
- `04-practical` - Practical examples

### Validation (7 exercises)
Accumulate all errors instead of failing fast.

- `01-basic` - Basic validation
- `02-accumulate` - Error accumulation
- `03-applicative` - Applicative validation
- `04-form` - Form validation
- `05-comparison` - vs Either comparison
- `06-nested` - Nested validation
- `07-real-world` - Real-world scenarios

### NonEmptyArray (6 exercises)
Type-safe arrays with guaranteed at least one element.

- `01-basic` - Creating NonEmptyArrays
- `02-from-array` - Converting from arrays
- `03-operations` - Basic operations
- `04-sort` - Sorting
- `05-group` - Grouping elements
- `06-practical` - Practical examples

### Task (6 exercises)
Lazy async computations that always succeed.

- `01-basic` - Creating Tasks
- `02-map` - Mapping over Tasks
- `03-chain` - Chaining Tasks
- `04-parallel` - Parallel execution
- `05-delay` - Delays and timing
- `06-practical` - Practical examples

### Ord (6 exercises)
Custom ordering and comparison for any type.

- `01-basic` - Basic Ord usage
- `02-contramap` - Deriving orderings
- `03-reverse` - Reversing order
- `04-min-max` - Finding extremes
- `05-sort` - Sorting with Ord
- `06-practical` - Practical examples

### Reader (8 exercises)
Dependency injection without global state.

- `01-create-reader` - Creating Readers
- `02-map` - Mapping over Readers
- `03-ask` - Accessing context
- `04-chain` - Chaining Readers
- `05-dependency-injection` - DI patterns
- `06-local` - Local context
- `07-real-world-config` - Configuration management
- `08-advanced` - Advanced patterns

### ReaderTaskEither (8 exercises)
The ultimate composition: Reader + Task + Either for real-world apps.

- `01-basic` - Creating RTE values
- `02-ask` - Environment access
- `03-map` - Mapping success values
- `04-chain` - Chaining operations
- `05-local` - Local environment modifications
- `06-mapleft` - Transforming errors
- `07-parallel` - Parallel execution
- `08-practical` - Cache with fallback

### IO/IOEither (7 exercises)
Synchronous side effects with type safety.

- `01-basic-io` - Creating IO values
- `02-io-chain` - Chaining IO operations
- `03-ioeither-basic` - IOEither basics
- `04-trycatch` - Wrapping throwing code
- `05-chain` - Chaining with error handling
- `06-from-io` - Converting IO to IOEither
- `07-practical` - Config loading

### These (6 exercises)
Inclusive-or: "this", "that", or "both" simultaneously.

- `01-basic` - Creating These values
- `02-fold` - Pattern matching
- `03-map` - Mapping values
- `04-from-options` - Converting from Options
- `05-semigroup` - Combining These values
- `06-practical` - Validation with warnings

## 🎓 Recommended Learning Path

### Beginner Path
1. **Option** - Learn safe null handling (10 exercises)
2. **Array** - Master functional array operations (10 exercises)
3. **Pipe** - Understand function composition (5 exercises)
4. **Flow** - Create reusable pipelines (5 exercises)

### Intermediate Path
5. **Either** - Master error handling (8 exercises)
6. **Record** - Work with objects functionally (8 exercises)
7. **TaskEither** - Async operations with error handling (10 exercises)
8. **NonEmptyArray** - Type-safe non-empty arrays (6 exercises)
9. **Task** - Lazy async computations (6 exercises)
10. **Ord** - Custom ordering and comparison (6 exercises)

### Advanced Path
11. **Semigroup** - Combining values systematically (4 exercises)
12. **Monoid** - Semigroup with identity (4 exercises)
13. **Validation** - Error accumulation patterns (7 exercises)
14. **Reader** - Dependency injection patterns (8 exercises)
15. **IO/IOEither** - Synchronous side effects (7 exercises)
16. **These** - Inclusive-or type (6 exercises)

### Expert Path
17. **ReaderTaskEither** - Ultimate composition for real-world apps (8 exercises)

## 💻 Available Scripts

### Main Project (CLI)
- `npm run exercise` - Run interactive exercises in the terminal
- `npm run solution` - View exercise solutions
- `npm test` - Run all tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:ui` - Open Vitest UI
- `npm run type-check` - Run TypeScript type checking
- `npm run lint` - Lint code with ESLint
- `npm run lint:fix` - Auto-fix linting issues
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting

### Playground (Web)
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run generate:exercises` - Sync CLI exercises to playground

## 🎯 Progress Tracking

The web playground includes a **progress tracking system**:

- ✅ **Automatic Saving**: Progress saved to localStorage
- 📊 **Dashboard**: Visual overview of completed exercises
- 🎯 **Module Progress**: Track progress per module
- 🔄 **Attempt Tracking**: See how many times you've tried each exercise
- ⭕ **Status Indicators**:
  - ✅ Completed (tests passed)
  - 🔄 In Progress (attempted but not completed)
  - ⭕ Not Started

Access the dashboard at [http://localhost:3000/dashboard](http://localhost:3000/dashboard)

## 🏗️ Project Structure

```
fp-ts-exercises/
├── src/                      # CLI exercises
│   ├── option/              # Option exercises (10)
│   ├── either/              # Either exercises (8)
│   ├── pipe/                # Pipe exercises (5)
│   ├── flow/                # Flow exercises (5)
│   ├── array/               # Array exercises (10)
│   ├── taskeither/          # TaskEither exercises (10)
│   ├── record/              # Record exercises (8)
│   ├── semigroup/           # Semigroup exercises (4)
│   ├── monoid/              # Monoid exercises (4)
│   ├── validation/          # Validation exercises (7)
│   ├── nonemptyarray/       # NonEmptyArray exercises (6)
│   ├── task/                # Task exercises (6)
│   ├── ord/                 # Ord exercises (6)
│   ├── reader/              # Reader exercises (8)
│   ├── readertaskeither/    # ReaderTaskEither exercises (8)
│   ├── io/                  # IO/IOEither exercises (7)
│   └── these/               # These exercises (6)
├── scripts/                  # CLI tools
│   ├── exercise.js          # Exercise runner
│   └── generate-playground-data.js  # Sync to playground
├── playground/              # Web playground
│   ├── src/
│   │   ├── app/            # Next.js pages
│   │   ├── components/     # React components
│   │   ├── contexts/       # Progress tracking
│   │   ├── data/           # Exercise data
│   │   ├── types/          # TypeScript types
│   │   └── utils/          # Test runner & utilities
│   └── package.json
└── package.json
```

## 🆕 What's New in v2.0

### Major Features
- ✨ **Web Playground**: Interactive browser-based learning
- 📊 **Progress Tracking**: Track your learning journey
- 🎯 **Dashboard**: Visualize your progress
- 🔄 **Real-time Testing**: Execute tests in the browser
- 📚 **Comprehensive Content**: 118 exercises across 18 modules covering beginner to expert topics

### Updated Dependencies
- **fp-ts 2.16+**: Latest version with improved TypeScript support
- **Vitest**: Modern, fast testing framework
- **ESLint 9**: Latest linting with TypeScript support
- **Prettier 3**: Modern code formatting
- **TypeScript 5.7**: Latest TypeScript features
- **Next.js 15**: For the web playground
- **React 19**: Latest React features

### Modern Development Experience
- **ES Modules**: Modern module system
- **TypeScript Compilation**: Real TypeScript compiler in browser
- **Watch Mode**: Automatic re-running on file changes
- **Better Error Messages**: Clear test output and type errors
- **Monaco Editor**: VS Code-like editing experience

### Breaking Changes from v1.x
- Import syntax updated to use modern fp-ts patterns
- Test assertions use Vitest instead of Chai
- ES modules instead of CommonJS
- New exercise structure with exercise/solution pairs

## 📝 Exercise Format

Each exercise consists of two files:

- **`.exercise.ts`**: Starting point with `@ts-ignore` and TODOs
- **`.solution.ts`**: Complete working solution

Example:
```typescript
// 01-example.exercise.ts
import * as O from 'fp-ts/Option'

// @ts-ignore
const getSome = (n: number): O.Option<number> => {
  //TODO: Return Some(n)
}

// Tests
describe('getSome', () => {
  it('returns Some with the given value', () => {
    expect(getSome(5)).toEqual(O.some(5))
  })
})
```

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Add New Exercises**: Create new exercises for other fp-ts modules
2. **Improve Documentation**: Enhance explanations and examples
3. **Fix Bugs**: Report or fix issues
4. **Improve Playground**: Add features to the web playground

### Adding New Exercises

1. Create `.exercise.ts` and `.solution.ts` files in the appropriate module folder
2. Follow the existing exercise format
3. Include tests using Vitest
4. Run `npm run generate:exercises` to sync to playground
5. Test both CLI and playground versions

## 📚 Resources

- [fp-ts Documentation](https://gcanti.github.io/fp-ts/)
- [fp-ts GitHub](https://github.com/gcanti/fp-ts)
- [Functional Programming in TypeScript](https://www.manning.com/books/functional-programming-in-typescript)

## 📄 License

MIT License - see [LICENSE.txt](LICENSE.txt) for details.

## 🙏 Acknowledgments

- [Giulio Canti](https://github.com/gcanti) for creating fp-ts
- The fp-ts community for excellent documentation and support

---

**Happy Learning! 🎉**

Start with `npm run exercise -- option 01` or launch the playground with `cd playground && npm run dev`
