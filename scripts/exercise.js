import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import chokidar from "chokidar";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const srcPath = path.resolve(__dirname, "../src");

const [, , dir, exercise] = process.argv;

// Show help if requested
if (dir === "help" || dir === "--help" || dir === "-h") {
  console.log(`
╔═══════════════════════════════════════════════════════════╗
║           fp-ts-exercises - Interactive Learning         ║
╚═══════════════════════════════════════════════════════════╝

Usage:
  npm run exercise -- <module> <exercise-number>
  npm run solution -- <module> <exercise-number>

Examples:
  npm run exercise -- option 01      Run first Option exercise
  npm run solution -- option 01      View solution for first exercise
  npm run exercise -- list           List all available exercises

Available modules:
  option    10 exercises on Option type
  either    Coming soon
  pipe      Coming soon
  flow      Coming soon

The exercise runner will:
  ✓ Watch your file for changes
  ✓ Type-check your code  ✓ Run tests automatically
  ✓ Give instant feedback

Press Ctrl+C to stop the exercise runner.
`);
  process.exit(0);
}

// List all exercises
if (dir === "list") {
  console.log(`
╔═══════════════════════════════════════════════════════════╗
║              Available fp-ts Exercises                   ║
╚═══════════════════════════════════════════════════════════╝
`);

  const modules = fs.readdirSync(srcPath);
  modules.forEach(module => {
    const modulePath = path.join(srcPath, module);
    if (fs.statSync(modulePath).isDirectory()) {
      const exercises = fs.readdirSync(modulePath)
        .filter(file => file.endsWith('.exercise.ts'))
        .map(file => file.replace('.exercise.ts', ''))
        .sort();

      if (exercises.length > 0) {
        console.log(`\n📁 ${module.toUpperCase()} (${exercises.length} exercises)`);
        exercises.forEach((ex, idx) => {
          console.log(`   ${idx + 1}. ${ex}`);
        });
      }
    }
  });

  console.log(`\nRun an exercise:
  npm run exercise -- <module> <exercise-number>

Example:
  npm run exercise -- option 01
`);
  process.exit(0);
}

if (!exercise) {
  console.log("❌ Please specify an exercise");
  console.log("\nUsage:");
  console.log("  npm run exercise -- <module> <exercise-number>");
  console.log("\nExamples:");
  console.log("  npm run exercise -- option 01");
  console.log("  npm run exercise -- list       (see all exercises)");
  console.log("  npm run exercise -- help       (show help)");
  process.exit(1);
}

const pathToFolder = srcPath + "/" + dir;

if (!fs.existsSync(pathToFolder)) {
  console.log(`❌ Module '${dir}' not found`);
  console.log("\nAvailable modules:");
  const modules = fs.readdirSync(srcPath)
    .filter(item => fs.statSync(path.join(srcPath, item)).isDirectory());
  modules.forEach(m => console.log(`  - ${m}`));
  console.log("\nTry:");
  console.log(`  npm run exercise -- list`);
  process.exit(1);
}

const allExercises = fs.readdirSync(pathToFolder);

let pathIndicator = ".exercise.";

if (process.env.SOLUTION) {
  pathIndicator = ".solution.";
}

const exercisePath = allExercises.find(
  (exercisePath) =>
    exercisePath.startsWith(exercise) && exercisePath.includes(pathIndicator)
);

if (!exercisePath) {
  console.log(`❌ Exercise '${exercise}' not found in ${dir} module`);
  console.log("\nAvailable exercises:");
  const available = allExercises
    .filter(e => e.includes('.exercise.ts'))
    .map(e => e.replace('.exercise.ts', ''))
    .sort();
  available.forEach(e => console.log(`  - ${e}`));
  console.log("\nTry:");
  console.log(`  npm run exercise -- ${dir} ${available[0] || '01'}`);
  process.exit(1);
}

const exerciseFile = path.resolve(pathToFolder, exercisePath);

const exerciseName = exercisePath.replace(pathIndicator, '').replace('.ts', '');
const mode = process.env.SOLUTION ? 'SOLUTION' : 'EXERCISE';

console.log(`
╔═══════════════════════════════════════════════════════════╗
║  ${mode}: ${dir}/${exerciseName}${' '.repeat(Math.max(0, 44 - mode.length - dir.length - exerciseName.length))}║
╚═══════════════════════════════════════════════════════════╝

👀 Watching for changes... (Press Ctrl+C to stop)
`);

let isFirstRun = true;

chokidar.watch(exerciseFile).on("all", (event, path) => {
  try {
    console.clear();
    console.log(`
╔═══════════════════════════════════════════════════════════╗
║  ${mode}: ${dir}/${exerciseName}${' '.repeat(Math.max(0, 44 - mode.length - dir.length - exerciseName.length))}║
╚═══════════════════════════════════════════════════════════╝
`);

    if (!isFirstRun) {
      console.log("📝 Change detected! Re-running tests...\n");
    }
    isFirstRun = false;

    console.log("🔍 Type checking...");
    execSync(`tsc "${exerciseFile}" --noEmit --strict --skipLibCheck --module ESNext --moduleResolution bundler --target ES2022`, {
      stdio: "inherit",
    });
    console.log("✅ Type check passed!\n");

    console.log("🧪 Running tests...\n");
    execSync(`vitest run "${exerciseFile}"`, {
      stdio: "inherit",
    });

    console.log(`
╔═══════════════════════════════════════════════════════════╗
║  🎉 CONGRATULATIONS! You passed the exercise!            ║
╚═══════════════════════════════════════════════════════════╝

${mode === 'SOLUTION' ? '✨ This is the solution. Try implementing it yourself!' : '✨ Great job! Ready for the next challenge?'}

Next steps:
  npm run ${mode === 'SOLUTION' ? 'exercise' : 'solution'} -- ${dir} ${exerciseName.split('-')[0]}    ${mode === 'SOLUTION' ? 'Try the exercise yourself' : 'View the solution'}
`);
    process.exit(0);
  } catch (e) {
    console.log(`
╔═══════════════════════════════════════════════════════════╗
║  ❌ Tests failed - keep trying!                          ║
╚═══════════════════════════════════════════════════════════╝

💡 Tips:
  - Read the error messages carefully
  - Check the expected vs actual values
  - Review the TODOs in the code
  - Need help? Run: npm run solution -- ${dir} ${exerciseName.split('-')[0]}

👀 Watching for changes...
`);
  }
});
