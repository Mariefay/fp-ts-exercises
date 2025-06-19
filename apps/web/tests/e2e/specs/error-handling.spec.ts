import { test, expect } from '@playwright/test';
import { ExercisePage } from '../page-objects/exercise-page';

test.describe('Error Handling', () => {
  test('should handle non-existent exercise gracefully', async ({ page }) => {
    await page.goto('/exercises/option/non-existent-exercise');
    
    await expect(page).toHaveURL('/exercises/option/non-existent-exercise');
    
    await page.waitForLoadState('networkidle');
  });

  test('should handle non-existent category gracefully', async ({ page }) => {
    await page.goto('/exercises/non-existent-category');
    
    await expect(page).toHaveURL('/exercises/non-existent-category');
    
    await page.waitForLoadState('networkidle');
  });

  test('should handle GraphQL errors gracefully', async ({ page }) => {
    await page.route('**/graphql', route => {
      route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({
          errors: [{ message: 'Internal server error' }]
        })
      });
    });
    
    const exercisePage = new ExercisePage(page);
    
    await exercisePage.goto('option', 'option-01');
    
    await expect(page).toHaveURL('/exercises/option/option-01');
    
    await page.waitForLoadState('networkidle');
  });

  test('should handle network failures gracefully', async ({ page }) => {
    await page.route('**/graphql', route => {
      route.abort('failed');
    });
    
    const exercisePage = new ExercisePage(page);
    
    await exercisePage.goto('option', 'option-01');
    
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL('/exercises/option/option-01');
  });

  test('should handle slow network responses', async ({ page }) => {
    await page.route('**/graphql', async route => {
      await new Promise(resolve => setTimeout(resolve, 2000));
      await route.continue();
    });
    
    const exercisePage = new ExercisePage(page);
    
    await exercisePage.goto('option', 'option-01');
    
    await page.waitForTimeout(1000);
    
    await expect(page.getByText('Loading exercise...')).toBeVisible();
  });
});
