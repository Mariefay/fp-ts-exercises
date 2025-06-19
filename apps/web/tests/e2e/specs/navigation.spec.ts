import { test, expect } from '../fixtures/graphql-mocks';
import { ExerciseCategoriesPage } from '../page-objects/exercise-categories-page';
import { ExercisePage } from '../page-objects/exercise-page';

test.describe('Exercise Navigation', () => {
  test('should display exercise categories page', async ({ page }) => {
    const categoriesPage = new ExerciseCategoriesPage(page);
    
    await categoriesPage.goto();
    await categoriesPage.waitForLoad();
    
    await expect(categoriesPage.heading).toBeVisible();
    await expect(categoriesPage.description).toBeVisible();
    await expect(categoriesPage.categoryCards).toHaveCount(12);
  });

  test('should navigate from categories to specific category exercises', async ({ page }) => {
    const categoriesPage = new ExerciseCategoriesPage(page);
    
    await categoriesPage.goto();
    await categoriesPage.waitForLoad();
    
    await categoriesPage.clickCategory('option');
    
    await expect(page).toHaveURL(/\/exercises\/option/);
  });

  test('should display category information correctly', async ({ page }) => {
    const categoriesPage = new ExerciseCategoriesPage(page);
    
    await categoriesPage.goto();
    await categoriesPage.waitForLoad();
    
    const optionCard = await categoriesPage.getCategoryCard('option');
    await expect(optionCard).toBeVisible();
    
    const title = await categoriesPage.getCategoryTitle('option');
    await expect(title).toContainText('Option');
    
    const description = await categoriesPage.getCategoryDescription('option');
    await expect(description).toContainText('optional values safely');
    
    const exerciseCount = await categoriesPage.getCategoryExerciseCount('option');
    await expect(exerciseCount).toContainText('10 exercise');
  });

  test('should navigate to individual exercise page', async ({ page }) => {
    const exercisePage = new ExercisePage(page);
    
    await exercisePage.goto('option', 'option-01');
    await exercisePage.waitForLoad();
    
    await expect(exercisePage.exerciseTitle).toBeVisible();
    await expect(exercisePage.sandpackEditor).toBeVisible();
    await expect(page).toHaveURL('/exercises/option/option-01');
  });

  test('should navigate back from exercise to category', async ({ page }) => {
    const exercisePage = new ExercisePage(page);
    
    await exercisePage.goto('option', 'option-01');
    await exercisePage.waitForLoad();
    
    await exercisePage.clickBackLink();
    
    await expect(page).toHaveURL(/\/exercises\/option/);
  });

  test('should display exercise metadata correctly', async ({ page }) => {
    const exercisePage = new ExercisePage(page);
    
    await exercisePage.goto('option', 'option-01');
    await exercisePage.waitForLoad();
    
    await expect(exercisePage.exerciseTitle).toContainText('Safe Array Access');
    await expect(exercisePage.goalStatement).toContainText('safely gets the first element');
    await expect(exercisePage.conceptExplanation).toBeVisible();
    
    const tags = await exercisePage.getTagTexts();
    expect(tags).toContain('option');
    expect(tags).toContain('basics');
  });
});
