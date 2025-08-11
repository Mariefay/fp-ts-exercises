# fp-ts Playground

An interactive browser-based learning platform for fp-ts (functional programming in TypeScript).

## Features

- **Interactive Code Editor**: Monaco Editor with TypeScript support and fp-ts type definitions
- **Real-time Testing**: Run tests directly in the browser with immediate feedback
- **Exercise Navigation**: Browse through categorized exercises with difficulty levels
- **Solution Viewer**: Compare your solution with the recommended approach
- **Progress Tracking**: Visual progress indicator showing completion status

## Development

This playground is built with:

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type safety and enhanced development experience
- **Tailwind CSS** - Utility-first styling
- **Monaco Editor** - VS Code-like editing experience
- **Vitest** - Fast test runner for validation
- **fp-ts** - Functional programming library for TypeScript

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Exercise Structure

Each exercise includes:

- **Exercise Code**: Starting template with TODO comments
- **Solution Code**: Complete implementation
- **Test Cases**: Validation tests to verify correctness
- **Description**: Learning objectives and instructions

## Categories

- **Option**: Learn about Maybe/Optional patterns
- **Either**: Error handling with functional approaches
- **IO**: Managing side effects
- **Task**: Asynchronous programming
- **Array/ReadonlyArray**: Working with collections

## Contributing

To add new exercises:

1. Create exercise and solution files in the appropriate category
2. Add the exercise definition to `src/data/exercises.ts`
3. Include comprehensive test cases
4. Update documentation as needed

## License

This project is licensed under the MIT License.
