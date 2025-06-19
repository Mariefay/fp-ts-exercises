import { test, expect } from '../fixtures/graphql-mocks';
import { ExerciseCategoriesPage } from '../page-objects/exercise-categories-page';
import { ExercisePage } from '../page-objects/exercise-page';

test.describe('Responsive Design', () => {
  test('should display categories page correctly on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    
    const categoriesPage = new ExerciseCategoriesPage(page);
    
    await categoriesPage.goto();
    await categoriesPage.waitForLoad();
    
    await expect(categoriesPage.heading).toBeVisible();
    await expect(categoriesPage.categoryCards).toHaveCount(12);
    
    const firstCard = categoriesPage.categoryCards.first();
    await expect(firstCard).toBeVisible();
  });

  test('should display exercise page correctly on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    
    const exercisePage = new ExercisePage(page);
    
    await exercisePage.goto('option', 'option-01');
    await exercisePage.waitForLoad();
    
    await expect(exercisePage.exerciseTitle).toBeVisible();
    await expect(exercisePage.sandpackEditor).toBeVisible();
  });

  test('should display categories page correctly on tablet', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    
    const categoriesPage = new ExerciseCategoriesPage(page);
    
    await categoriesPage.goto();
    await categoriesPage.waitForLoad();
    
    await expect(categoriesPage.heading).toBeVisible();
    await expect(categoriesPage.categoryCards).toHaveCount(12);
  });

  test('should display exercise page correctly on tablet', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    
    const exercisePage = new ExercisePage(page);
    
    await exercisePage.goto('option', 'option-01');
    await exercisePage.waitForLoad();
    
    await expect(exercisePage.exerciseTitle).toBeVisible();
    await expect(exercisePage.sandpackEditor).toBeVisible();
  });

  test('should display categories page correctly on desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    
    const categoriesPage = new ExerciseCategoriesPage(page);
    
    await categoriesPage.goto();
    await categoriesPage.waitForLoad();
    
    await expect(categoriesPage.heading).toBeVisible();
    await expect(categoriesPage.categoryCards).toHaveCount(12);
  });

  test('should handle viewport changes gracefully', async ({ page }) => {
    const categoriesPage = new ExerciseCategoriesPage(page);
    
    await categoriesPage.goto();
    await categoriesPage.waitForLoad();
    
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(categoriesPage.heading).toBeVisible();
    
    await page.setViewportSize({ width: 1920, height: 1080 });
    await expect(categoriesPage.heading).toBeVisible();
    
    await page.setViewportSize({ width: 768, height: 1024 });
    await expect(categoriesPage.heading).toBeVisible();
  });
});
