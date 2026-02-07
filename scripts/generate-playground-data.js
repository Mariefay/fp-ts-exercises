import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const srcPath = path.resolve(__dirname, '../src')
const outputPath = path.resolve(__dirname, '../playground/src/data/generated-exercises.ts')

// Difficulty mapping based on exercise number
const getDifficulty = (exerciseNum) => {
  const num = parseInt(exerciseNum, 10)
  if (num <= 3) return 'beginner'
  if (num <= 6) return 'intermediate'
  return 'advanced'
}

// Extract title from filename (e.g., "01-some-and-none" -> "Some And None")
const getTitle = (filename) => {
  return filename
    .replace(/^\d+-/, '') // Remove leading number
    .replace('.exercise.ts', '')
    .replace('.solution.ts', '')
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

// Extract description from filename/module
const getDescription = (module, title) => {
  return `Learn about ${title.toLowerCase()} in fp-ts ${module}`
}

// Extract test code from file content
const extractTests = (content) => {
  const testMatch = content.match(/\/\/TESTS[\s\S]*$/m)
  if (!testMatch) {
    // Fallback: look for describe block
    const describeMatch = content.match(/describe\([^)]+\)[\s\S]*$/m)
    return describeMatch ? describeMatch[0] : ''
  }
  return testMatch[0].replace('//TESTS\n', '').trim()
}

// Extract implementation code (without tests)
const extractImplementation = (content) => {
  // Remove test code
  const testsMarker = content.indexOf('//TESTS')
  if (testsMarker !== -1) {
    return content.substring(0, testsMarker).trim()
  }

  // Fallback: remove describe block
  const describeMatch = content.match(/describe\([^)]+\)[\s\S]*$/m)
  if (describeMatch) {
    return content.substring(0, describeMatch.index).trim()
  }

  return content.trim()
}

// Generate exercises data
const generateExercises = () => {
  const exercises = []
  const modules = fs.readdirSync(srcPath).filter(item => {
    const modulePath = path.join(srcPath, item)
    return fs.statSync(modulePath).isDirectory()
  })

  modules.forEach(module => {
    const modulePath = path.join(srcPath, module)
    const files = fs.readdirSync(modulePath)

    // Get all exercise files
    const exerciseFiles = files
      .filter(f => f.endsWith('.exercise.ts'))
      .sort()

    exerciseFiles.forEach((exerciseFile, index) => {
      const exerciseNumber = exerciseFile.match(/^(\d+)/)?.[1] || (index + 1).toString().padStart(2, '0')
      const solutionFile = exerciseFile.replace('.exercise.ts', '.solution.ts')

      const exercisePath = path.join(modulePath, exerciseFile)
      const solutionPath = path.join(modulePath, solutionFile)

      if (!fs.existsSync(solutionPath)) {
        console.warn(`Warning: No solution file found for ${exerciseFile}`)
        return
      }

      const exerciseCode = fs.readFileSync(exercisePath, 'utf-8')
      const solutionCode = fs.readFileSync(solutionPath, 'utf-8')

      const title = getTitle(exerciseFile)
      const testCode = extractTests(exerciseCode)
      const exerciseImplementation = extractImplementation(exerciseCode)
      const solutionImplementation = extractImplementation(solutionCode)

      exercises.push({
        id: `${module}-${exerciseNumber}`,
        title,
        description: getDescription(module, title),
        category: module.charAt(0).toUpperCase() + module.slice(1),
        fileName: exerciseFile,
        difficulty: getDifficulty(exerciseNumber),
        order: parseInt(exerciseNumber, 10),
        exerciseCode: exerciseImplementation, // Only implementation, no tests
        solutionCode: solutionImplementation, // Only implementation, no tests
        testCode // Tests shown separately in Test Runner
      })
    })
  })

  return exercises.sort((a, b) => {
    // Sort by category, then by order
    if (a.category !== b.category) {
      return a.category.localeCompare(b.category)
    }
    return a.order - b.order
  })
}

// Write to file
const writeExercisesFile = (exercises) => {
  const content = `// Auto-generated exercises from CLI version
// Generated on: ${new Date().toISOString()}
// DO NOT EDIT MANUALLY - Run 'npm run generate:exercises' to regenerate

import { Exercise } from '@/types/exercise'

export const generatedExercises: Exercise[] = ${JSON.stringify(exercises, null, 2)}

// Export alias for convenience
export const exercises = generatedExercises
`

  // Ensure directory exists
  const dir = path.dirname(outputPath)
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }

  fs.writeFileSync(outputPath, content, 'utf-8')
  console.log(`✅ Generated ${exercises.length} exercises`)
  console.log(`📝 Written to: ${outputPath}`)

  // Print summary
  const byCategory = exercises.reduce((acc, ex) => {
    acc[ex.category] = (acc[ex.category] || 0) + 1
    return acc
  }, {})

  console.log('\n📊 Summary:')
  Object.entries(byCategory).forEach(([category, count]) => {
    console.log(`   ${category}: ${count} exercises`)
  })
}

// Main
try {
  console.log('🔨 Generating playground exercises from CLI files...\n')
  const exercises = generateExercises()
  writeExercisesFile(exercises)
  console.log('\n✨ Done!')
} catch (error) {
  console.error('❌ Error generating exercises:', error)
  process.exit(1)
}
