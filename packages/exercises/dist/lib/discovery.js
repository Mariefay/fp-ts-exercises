import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { ExerciseParser } from './parser.js';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export class ExerciseDiscovery {
    srcPath;
    parser;
    catalog = null;
    constructor() {
        this.srcPath = path.resolve(__dirname, '../../src');
        this.parser = new ExerciseParser(this.srcPath);
    }
    /**
     * Scan the file system and build the exercise catalog
     */
    async buildCatalog() {
        if (this.catalog) {
            return this.catalog;
        }
        const categories = [];
        const exercises = [];
        const categoryDirs = fs.readdirSync(this.srcPath, { withFileTypes: true })
            .filter(dirent => dirent.isDirectory())
            .map(dirent => dirent.name);
        for (const categoryName of categoryDirs) {
            const categoryPath = path.join(this.srcPath, categoryName);
            const categoryExercises = await this.scanCategoryExercises(categoryName, categoryPath);
            exercises.push(...categoryExercises);
            categories.push({
                name: this.formatCategoryName(categoryName),
                slug: categoryName,
                description: this.getCategoryDescription(categoryName),
                exercises: categoryExercises.map(ex => ex.metadata),
                totalCount: categoryExercises.length,
            });
        }
        this.catalog = {
            categories,
            exercises,
            totalCount: exercises.length,
        };
        return this.catalog;
    }
    /**
     * Scan exercises in a specific category directory
     */
    async scanCategoryExercises(categoryName, categoryPath) {
        const exercises = [];
        const allFiles = fs.readdirSync(categoryPath);
        const exerciseGroups = new Map();
        for (const file of allFiles) {
            const numberMatch = file.match(/^(\d+)/);
            if (!numberMatch)
                continue;
            const number = numberMatch[1];
            if (!exerciseGroups.has(number)) {
                exerciseGroups.set(number, {});
            }
            const group = exerciseGroups.get(number);
            if (file.includes('.exercise.')) {
                group.exercise = file;
            }
            else if (file.includes('.solution.')) {
                group.solution = file;
            }
        }
        for (const [number, group] of exerciseGroups) {
            if (group.exercise && group.solution) {
                const exerciseFile = path.join(categoryPath, group.exercise);
                const solutionFile = path.join(categoryPath, group.solution);
                try {
                    const exercise = this.parser.parseExercise(categoryName, exerciseFile, solutionFile);
                    exercises.push(exercise);
                }
                catch (error) {
                    console.warn(`Failed to parse exercise ${categoryName}/${number}:`, error);
                }
            }
        }
        exercises.sort((a, b) => parseInt(a.metadata.number) - parseInt(b.metadata.number));
        return exercises;
    }
    /**
     * Get all exercises
     */
    async getExercises() {
        const catalog = await this.buildCatalog();
        return catalog.exercises;
    }
    /**
     * Get exercise by slug (e.g., "option-01")
     */
    async getExerciseBySlug(slug) {
        const catalog = await this.buildCatalog();
        return catalog.exercises.find(ex => ex.metadata.slug === slug) || null;
    }
    /**
     * Get exercises by category
     */
    async getExercisesByCategory(category) {
        const catalog = await this.buildCatalog();
        return catalog.exercises.filter(ex => ex.metadata.category === category);
    }
    /**
     * Get all categories
     */
    async getCategories() {
        const catalog = await this.buildCatalog();
        return catalog.categories;
    }
    /**
     * Get category by slug
     */
    async getCategoryBySlug(slug) {
        const catalog = await this.buildCatalog();
        return catalog.categories.find(cat => cat.slug === slug) || null;
    }
    formatCategoryName(categoryName) {
        return categoryName.charAt(0).toUpperCase() + categoryName.slice(1);
    }
    getCategoryDescription(categoryName) {
        const descriptions = {
            option: 'Learn to handle optional values safely with the Option type',
            either: 'Master error handling with the Either type',
            task: 'Work with asynchronous operations using Task',
            taskEither: 'Combine async operations with error handling',
            readerTaskEither: 'Advanced dependency injection patterns',
            pipe: 'Function composition with pipe',
            flow: 'Function composition with flow',
        };
        return descriptions[categoryName] || `Exercises for ${categoryName}`;
    }
}
