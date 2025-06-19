import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import chokidar from 'chokidar';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const srcPath = path.resolve(__dirname, '../src');

const [, , dir, exercise] = process.argv;

if (!exercise) {
  console.log('Please specify an exercise');
  process.exit(1);
}

const pathToFolder = srcPath + '/' + dir;

const allExercises = fs.readdirSync(pathToFolder);

let pathIndicator = '.test.';

const testFile = allExercises.find(
  (exercisePath) =>
    exercisePath.startsWith(exercise) && exercisePath.includes(pathIndicator)
);

if (!testFile) {
  console.error(`Test file for exercise ${exercise} not found in ${pathToFolder}`);
  process.exit(1);
}

console.log(`Running tests: ${testFile}`);

const exerciseFile = testFile.replace('.test.', '.exercise.');
const watchFiles = [testFile, exerciseFile].map(f => path.join(pathToFolder, f));

chokidar.watch(watchFiles).on('change', () => {
  console.log(`\n🔄 File changed, re-running tests...\n`);
  execSync(`npx vitest run "${testFile}"`, {
    stdio: 'inherit',
  });
});

execSync(`npx vitest run "${testFile}"`, {
  stdio: 'inherit',
});
