/**
 * Module concept cards for section pages
 * Each module has 4 concept cards describing key features
 * Auto-extracted from section pages - DO NOT EDIT MANUALLY
 */

interface ModuleConcept {
  title: string
  description: string
  icon: string
  color: string
}

export const moduleConcepts: Record<string, ModuleConcept[]> = {
  option: [
    {
      title: 'Safe Null Handling',
      description: 'Never worry about null or undefined runtime errors again',
      icon: '🛡️',
      color: 'bg-green-50 text-green-700',
    },
    {
      title: 'Composable Operations',
      description: 'Chain operations together without nested if-statements',
      icon: '🔗',
      color: 'bg-blue-50 text-blue-700',
    },
    {
      title: 'Type Safety',
      description: 'Compiler-enforced handling of all possible cases',
      icon: '✅',
      color: 'bg-green-50 text-green-700',
    },
    {
      title: 'Functional Style',
      description: 'Pure functions with predictable behavior',
      icon: '⚡',
      color: 'bg-yellow-50 text-yellow-700',
    },
  ],
  either: [
    {
      title: 'Explicit Error Handling',
      description: 'Make error cases visible in the type system',
      icon: '⚡',
      color: 'bg-blue-50 text-blue-700',
    },
    {
      title: 'Railway Pattern',
      description: 'Chain operations that short-circuit on error',
      icon: '🛤️',
      color: 'bg-blue-50 text-blue-700',
    },
    {
      title: 'Type-Safe',
      description: 'Both error and success types are known',
      icon: '✅',
      color: 'bg-green-50 text-green-700',
    },
    {
      title: 'Composable',
      description: 'Build complex flows from simple parts',
      icon: '🔗',
      color: 'bg-yellow-50 text-yellow-700',
    },
  ],
  pipe: [
    {
      title: 'Left-to-Right Flow',
      description: 'Read code in the order it executes',
      icon: '➡️',
      color: 'bg-blue-100 text-blue-700',
    },
    {
      title: 'No Nesting',
      description: 'Avoid deeply nested function calls',
      icon: '📏',
      color: 'bg-blue-100 text-blue-700',
    },
    {
      title: 'Easy to Debug',
      description: 'Step through transformations one at a time',
      icon: '🐛',
      color: 'bg-purple-100 text-purple-700',
    },
    {
      title: 'Compose Anything',
      description: 'Chain together any sequence of functions',
      icon: '🔗',
      color: 'bg-yellow-100 text-yellow-700',
    },
  ],
  flow: [
    {
      title: 'Reusable Pipelines',
      description: 'Create functions that can be used anywhere',
      icon: '♻️',
      color: 'bg-blue-100 text-blue-700',
    },
    {
      title: 'Point-Free Style',
      description: 'Define transformations without naming parameters',
      icon: '✨',
      color: 'bg-blue-100 text-blue-700',
    },
    {
      title: 'Function Composition',
      description: 'Build complex operations from simple parts',
      icon: '🏗️',
      color: 'bg-purple-100 text-purple-700',
    },
    {
      title: 'Type-Safe',
      description: 'Compiler ensures all functions connect properly',
      icon: '🔒',
      color: 'bg-green-100 text-green-700',
    },
  ],
  array: [
    {
      title: 'Immutable Operations',
      description: 'Transform data without mutations',
      icon: '🔒',
      color: 'bg-blue-50 text-blue-700',
    },
    {
      title: 'Composable',
      description: 'Chain operations with ease',
      icon: '🔗',
      color: 'bg-blue-50 text-blue-700',
    },
    {
      title: 'Type-Safe',
      description: 'Compile-time guarantees',
      icon: '✅',
      color: 'bg-green-50 text-green-700',
    },
    {
      title: 'Functional',
      description: 'Pure, predictable transformations',
      icon: '⚡',
      color: 'bg-yellow-50 text-yellow-700',
    },
  ],
  record: [
    {
      title: 'Immutable',
      description: 'Transform objects without mutation',
      icon: '🔒',
      color: 'bg-blue-50 text-blue-700',
    },
    {
      title: 'Type-Safe',
      description: 'Full TypeScript type inference',
      icon: '✅',
      color: 'bg-blue-50 text-blue-700',
    },
    {
      title: 'Functional',
      description: 'Map, filter, reduce over objects',
      icon: '⚙️',
      color: 'bg-blue-50 text-blue-700',
    },
    {
      title: 'Practical',
      description: 'Perfect for configs and data',
      icon: '📦',
      color: 'bg-blue-50 text-blue-700',
    },
  ],
  semigroup: [
    {
      title: 'Concat Operation',
      description: 'Combine two values into one',
      icon: '➕',
      color: 'bg-blue-50 text-blue-700',
    },
    {
      title: 'Associative',
      description: 'Order of operations doesn\'t matter',
      icon: '🔗',
      color: 'bg-blue-50 text-blue-700',
    },
    {
      title: 'Composable',
      description: 'Build complex combiners from simple ones',
      icon: '⚙️',
      color: 'bg-blue-50 text-blue-700',
    },
    {
      title: 'Universal',
      description: 'Works with any type of data',
      icon: '🌐',
      color: 'bg-blue-50 text-blue-700',
    },
  ],
  monoid: [
    {
      title: 'Empty Value',
      description: 'Identity element for safe defaults',
      icon: '⭕',
      color: 'bg-blue-50 text-blue-700',
    },
    {
      title: 'Safe Aggregation',
      description: 'Handle empty arrays gracefully',
      icon: '✅',
      color: 'bg-blue-50 text-blue-700',
    },
    {
      title: 'Concat + Empty',
      description: 'Semigroup with a neutral element',
      icon: '➕',
      color: 'bg-blue-50 text-blue-700',
    },
    {
      title: 'Universal',
      description: 'Works with any combinable type',
      icon: '🌐',
      color: 'bg-blue-50 text-blue-700',
    },
  ],
  ord: [
    {
      title: 'Custom Ordering',
      description: 'Define how to compare any type',
      icon: '🔢',
      color: 'bg-blue-50 text-blue-700',
    },
    {
      title: 'Type-Safe',
      description: 'Comparisons checked at compile time',
      icon: '✅',
      color: 'bg-blue-50 text-blue-700',
    },
    {
      title: 'Composable',
      description: 'Build complex orderings from simple ones',
      icon: '🔗',
      color: 'bg-blue-50 text-blue-700',
    },
    {
      title: 'Practical',
      description: 'Sorting, min, max, clamp operations',
      icon: '⚙️',
      color: 'bg-blue-50 text-blue-700',
    },
  ],
  reader: [
    {
      title: 'Dependency Injection',
      description: 'Pass config without globals',
      icon: '💉',
      color: 'bg-blue-50 text-blue-700',
    },
    {
      title: 'Testable',
      description: 'Easy to mock dependencies',
      icon: '🧪',
      color: 'bg-blue-50 text-blue-700',
    },
    {
      title: 'Composable',
      description: 'Chain operations with shared context',
      icon: '🔗',
      color: 'bg-blue-50 text-blue-700',
    },
    {
      title: 'Pure Functions',
      description: 'No hidden dependencies',
      icon: '✨',
      color: 'bg-blue-50 text-blue-700',
    },
  ],
  taskeither: [
    {
      title: 'Async + Errors',
      description: 'Handle promises with explicit error types',
      icon: '⚡',
      color: 'bg-blue-50 text-blue-700',
    },
    {
      title: 'Type-Safe',
      description: 'Both success and error types are known',
      icon: '✅',
      color: 'bg-blue-50 text-blue-700',
    },
    {
      title: 'Railway Pattern',
      description: 'Chain async operations that short-circuit',
      icon: '🛤️',
      color: 'bg-blue-50 text-blue-700',
    },
    {
      title: 'Production Ready',
      description: 'Perfect for real-world API calls',
      icon: '🚀',
      color: 'bg-blue-50 text-blue-700',
    },
  ],
  validation: [
    {
      title: 'Accumulate Errors',
      description: 'Collect all validation failures',
      icon: '📋',
      color: 'bg-blue-50 text-blue-700',
    },
    {
      title: 'No Short-Circuit',
      description: 'Unlike Either, runs all validations',
      icon: '🔄',
      color: 'bg-blue-50 text-blue-700',
    },
    {
      title: 'Better UX',
      description: 'Show users all errors at once',
      icon: '✨',
      color: 'bg-blue-50 text-blue-700',
    },
    {
      title: 'Form Validation',
      description: 'Perfect for complex form logic',
      icon: '📝',
      color: 'bg-blue-50 text-blue-700',
    },
  ],
  nonemptyarray: [
    {
      title: 'Never Empty',
      description: 'Guaranteed at least one element',
      icon: '✅',
      color: 'bg-blue-50 text-blue-700',
    },
    {
      title: 'Type Safety',
      description: 'No need to check for empty arrays',
      icon: '🛡️',
      color: 'bg-blue-50 text-blue-700',
    },
    {
      title: 'Safe Operations',
      description: 'head, last, max, min always work',
      icon: '🔒',
      color: 'bg-blue-50 text-blue-700',
    },
    {
      title: 'Better APIs',
      description: 'Express intent in types',
      icon: '🎯',
      color: 'bg-blue-50 text-blue-700',
    },
  ],
  task: [
    {
      title: 'Lazy Async',
      description: 'Deferred async computations',
      icon: '⏱️',
      color: 'bg-blue-50 text-blue-700',
    },
    {
      title: 'Always Succeeds',
      description: 'No error handling needed',
      icon: '✅',
      color: 'bg-blue-50 text-blue-700',
    },
    {
      title: 'Composable',
      description: 'Chain and combine async work',
      icon: '🔗',
      color: 'bg-blue-50 text-blue-700',
    },
    {
      title: 'Parallel Ready',
      description: 'Run multiple tasks concurrently',
      icon: '⚡',
      color: 'bg-blue-50 text-blue-700',
    },
  ],
  these: [
    {
      title: 'Three States',
      description: 'Left, Right, or Both at once',
      icon: '3️⃣',
      color: 'bg-blue-50 text-blue-700',
    },
    {
      title: 'Warnings',
      description: 'Return success with warnings',
      icon: '⚠️',
      color: 'bg-blue-50 text-blue-700',
    },
    {
      title: 'Accumulation',
      description: 'Collect errors while succeeding',
      icon: '📋',
      color: 'bg-blue-50 text-blue-700',
    },
    {
      title: 'Flexible',
      description: 'More powerful than Either',
      icon: '💪',
      color: 'bg-blue-50 text-blue-700',
    },
  ],
  readertaskeither: [
    {
      title: 'Triple Power',
      description: 'Reader + Task + Either combined',
      icon: '🎯',
      color: 'bg-blue-50 text-blue-700',
    },
    {
      title: 'Production Ready',
      description: 'Real-world app architecture',
      icon: '🚀',
      color: 'bg-blue-50 text-blue-700',
    },
    {
      title: 'Testable',
      description: 'Mock dependencies easily',
      icon: '🧪',
      color: 'bg-blue-50 text-blue-700',
    },
    {
      title: 'Type-Safe',
      description: 'Dependencies, errors, async all typed',
      icon: '✅',
      color: 'bg-blue-50 text-blue-700',
    },
  ],
  io: [
    {
      title: 'Lazy Side Effects',
      description: 'Defer execution until needed',
      icon: '⏱️',
      color: 'bg-blue-50 text-blue-700',
    },
    {
      title: 'Synchronous',
      description: 'No async complexity',
      icon: '🔄',
      color: 'bg-blue-50 text-blue-700',
    },
    {
      title: 'Testable',
      description: 'Control when effects execute',
      icon: '🧪',
      color: 'bg-blue-50 text-blue-700',
    },
    {
      title: 'Type-Safe',
      description: 'IOEither for error handling',
      icon: '✅',
      color: 'bg-blue-50 text-blue-700',
    },
  ],
}
