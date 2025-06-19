import { test, expect } from '../fixtures/graphql-mocks';
import { ExercisePage } from '../page-objects/exercise-page';
import { SandpackEditor } from '../page-objects/sandpack-editor';

test.describe('Progress Tracking', () => {
  test('should show completed indicator for completed exercises', async ({ page }) => {
    const exercisePage = new ExercisePage(page);
    
    await exercisePage.goto('option', 'option-01');
    await exercisePage.waitForLoad();
    
    await expect(exercisePage.completedIndicator).toBeVisible();
    
    const isCompleted = await exercisePage.isCompleted();
    expect(isCompleted).toBe(true);
  });

  test('should not show completed indicator for uncompleted exercises', async ({ page }) => {
    const exercisePage = new ExercisePage(page);
    
    await exercisePage.goto('either', 'either-01');
    await exercisePage.waitForLoad();
    
    const isCompleted = await exercisePage.isCompleted();
    expect(isCompleted).toBe(false);
  });

  test('should handle exercise completion flow', async ({ page }) => {
    const exercisePage = new ExercisePage(page);
    const sandpackEditor = new SandpackEditor(page);
    
    await exercisePage.goto('either', 'either-01');
    await exercisePage.waitForLoad();
    await sandpackEditor.waitForLoad();
    
    const wasCompleted = await exercisePage.isCompleted();
    expect(wasCompleted).toBe(false);
    
    await sandpackEditor.runTests();
    await sandpackEditor.waitForTestResults();
    
    await page.waitForTimeout(2000);
  });

  test('should maintain progress state across page reloads', async ({ page }) => {
    const exercisePage = new ExercisePage(page);
    
    await exercisePage.goto('option', 'option-01');
    await exercisePage.waitForLoad();
    
    const wasCompletedBefore = await exercisePage.isCompleted();
    
    await page.reload();
    await exercisePage.waitForLoad();
    
    const isCompletedAfter = await exercisePage.isCompleted();
    expect(isCompletedAfter).toBe(wasCompletedBefore);
  });

  test('should handle offline mode gracefully', async ({ page }) => {
    await page.route('**/graphql', route => {
      route.abort('failed');
    });
    
    const exercisePage = new ExercisePage(page);
    
    await exercisePage.goto('option', 'option-01');
    
    await page.waitForTimeout(3000);
    
    const isOffline = await exercisePage.isOffline();
    expect(isOffline).toBe(true);
  });
});
