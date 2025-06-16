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

let pathIndicator = '.exercise.';

if (process.env.SOLUTION) {
  pathIndicator = '.solution.';
}

const exercisePath = allExercises.find(
  (exercisePath) =>
    exercisePath.startsWith(exercise) && exercisePath.includes(pathIndicator)
);

if (!exercisePath) {
  console.log(`Exercise ${exercise} not found`);
  process.exit(1);
}

const exerciseFile = path.resolve(pathToFolder, exercisePath);

chokidar.watch(exerciseFile).on('all', (_event, _path) => {
  try {
    console.clear();
    console.log('Running tests...');
    execSync(`npx vitest run "${exerciseFile}"`, {
      stdio: 'inherit',
    });
    console.log('You passed the exercise!');
    process.exit(0);
  } catch {
    console.log('Failed. Try again!');
  }
});
