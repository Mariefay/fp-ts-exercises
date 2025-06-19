import { test, expect } from '../fixtures/graphql-mocks';
import { ExerciseCategoriesPage } from '../page-objects/exercise-categories-page';
import { ExercisePage } from '../page-objects/exercise-page';

test.describe('Visual Regression Tests', () => {
  test('should match exercise categories page screenshot', async ({ page }) => {
    const categoriesPage = new ExerciseCategoriesPage(page);
    
    await categoriesPage.goto();
    await categoriesPage.waitForLoad();
    
    await expect(page).toHaveScreenshot('exercise-categories-page.png');
  });

  test('should match exercise page screenshot', async ({ page }) => {
    const exercisePage = new ExercisePage(page);
    
    await exercisePage.goto('option', 'option-01');
    await exercisePage.waitForLoad();
    
    await expect(page).toHaveScreenshot('exercise-page-option-01.png');
  });

  test('should match exercise page with completed indicator', async ({ page }) => {
    const exercisePage = new ExercisePage(page);
    
    await exercisePage.goto('option', 'option-01');
    await exercisePage.waitForLoad();
    
    await expect(exercisePage.completedIndicator).toBeVisible();
    
    await expect(page).toHaveScreenshot('exercise-page-completed.png');
  });

  test('should match different exercise types', async ({ page }) => {
    const exercisePage = new ExercisePage(page);
    
    await exercisePage.goto('either', 'either-01');
    await exercisePage.waitForLoad();
    
    await expect(page).toHaveScreenshot('exercise-page-either-01.png');
  });

  test('should match mobile layout', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    
    const categoriesPage = new ExerciseCategoriesPage(page);
    
    await categoriesPage.goto();
    await categoriesPage.waitForLoad();
    
    await expect(page).toHaveScreenshot('exercise-categories-mobile.png');
  });

  test('should match tablet layout', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    
    const exercisePage = new ExercisePage(page);
    
    await exercisePage.goto('option', 'option-01');
    await exercisePage.waitForLoad();
    
    await expect(page).toHaveScreenshot('exercise-page-tablet.png');
  });
});
