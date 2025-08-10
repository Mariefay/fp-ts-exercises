# fp-ts-exercises

Interactive exercises to learn functional programming in TypeScript using the fp-ts library.

## Requirements

- Node.js >= 18.0.0
- npm >= 8.0.0

## Installation

1. Clone the repository
   ```bash
   git clone https://github.com/Mariefay/fp-ts-exercises.git
   cd fp-ts-exercises
   ```

2. Install dependencies
   ```bash
   npm install
   ```

## Usage

### Running Exercises

Each folder in `src` contains exercises for different fp-ts concepts.

To run an exercise:
```bash
npm run exercise -- <module> <exercise_number>
```

Example - run the first Option exercise:
```bash
npm run exercise -- option 01
```

The exercise runner will:
- Type-check your code
- Run tests to verify your solution
- Watch for file changes and re-run automatically

### Viewing Solutions

To run the solution for any exercise:
```bash
npm run solution -- <module> <exercise_number>
```

Example:
```bash
npm run solution -- option 01
```

### Available Scripts

- `npm run exercise` - Run interactive exercises
- `npm run solution` - Run exercise solutions
- `npm test` - Run all tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:ui` - Open Vitest UI
- `npm run type-check` - Run TypeScript type checking
- `npm run lint` - Lint code with ESLint
- `npm run lint:fix` - Auto-fix linting issues
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting

## What's New in v2.0

This version has been completely modernized with:

### Updated Dependencies
- **fp-ts 2.16+**: Latest version with improved TypeScript support
- **Vitest**: Replaced Mocha/Chai for faster, modern testing
- **ESLint 9**: Latest linting with TypeScript support
- **Prettier 3**: Modern code formatting
- **TypeScript 5.7**: Latest TypeScript features

### Modern Development Experience
- **ES Modules**: Modern module system
- **Vitest UI**: Interactive test runner interface
- **Watch Mode**: Automatic re-running on file changes
- **Better Error Messages**: Clearer test output and type errors
- **Improved Performance**: Faster test execution

### Breaking Changes from v1.x
- Import syntax updated to use modern fp-ts patterns
- Test assertions use Vitest instead of Chai
- ES modules instead of CommonJS

## Exercise Topics

### Option
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

## Contributing

Contributions are welcome! Please feel free to submit issues and pull requests.

## License

MIT License - see [LICENSE.txt](LICENSE.txt) for details.
