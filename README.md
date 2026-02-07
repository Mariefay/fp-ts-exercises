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

This project contains **28 exercises** across 4 core fp-ts modules:

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
- `05-from-predicate` - Advanced predicates
- `06-chain` - Chaining Either operations
- `07-map-left` - Transforming error values
- `08-map-left` - Advanced error transformations

### Pipe (5 exercises)
Learn powerful function composition with pipe.

- `01-basic-pipe` - Introduction to pipe
- `02-multi-step` - Chaining multiple operations
- `03-with-option` - Pipe with Option types
- `04-with-either` - Pipe with Either types
- `05-real-world` - Practical data transformations

### Flow (5 exercises)
Create reusable function pipelines with flow.

- `01-basic-flow` - Introduction to flow
- `02-composition` - Function composition patterns
- `03-reusable-pipelines` - Building reusable flows
- `04-with-fp-ts` - Flow with fp-ts types
- `05-practical-example` - Real-world use cases

## 🎓 Recommended Learning Path

1. **Start with Option** - Learn safe null handling
2. **Move to Either** - Master error handling
3. **Practice Pipe** - Understand function composition
4. **Master Flow** - Create reusable pipelines

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
│   ├── option/              # Option exercises
│   ├── either/              # Either exercises
│   ├── pipe/                # Pipe exercises
│   └── flow/                # Flow exercises
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
- 📚 **More Exercises**: 28 exercises across 4 modules

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
