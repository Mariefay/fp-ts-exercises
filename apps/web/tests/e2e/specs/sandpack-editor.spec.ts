import { test, expect } from '../fixtures/graphql-mocks';
import { ExercisePage } from '../page-objects/exercise-page';
import { SandpackEditor } from '../page-objects/sandpack-editor';

test.describe('Sandpack Editor Interactions', () => {
  test('should load Sandpack editor correctly', async ({ page }) => {
    const exercisePage = new ExercisePage(page);
    const sandpackEditor = new SandpackEditor(page);
    
    await exercisePage.goto('option', 'option-01');
    await exercisePage.waitForLoad();
    await sandpackEditor.waitForLoad();
    
    await expect(sandpackEditor.editorContainer).toBeVisible();
    await expect(sandpackEditor.runTestsButton).toBeVisible();
  });

  test('should display editor tabs', async ({ page }) => {
    const exercisePage = new ExercisePage(page);
    const sandpackEditor = new SandpackEditor(page);
    
    await exercisePage.goto('option', 'option-01');
    await exercisePage.waitForLoad();
    await sandpackEditor.waitForLoad();
    
    const tabs = await sandpackEditor.getVisibleTabs();
    expect(tabs).toContain('exercise.ts');
  });

  test('should run tests and display results', async ({ page }) => {
    const exercisePage = new ExercisePage(page);
    const sandpackEditor = new SandpackEditor(page);
    
    await exercisePage.goto('option', 'option-01');
    await exercisePage.waitForLoad();
    await sandpackEditor.waitForLoad();
    
    await sandpackEditor.runTests();
    
    await expect(sandpackEditor.runTestsButton).toContainText('Running Tests...');
    
    await sandpackEditor.waitForTestResults();
    
    const resultText = await sandpackEditor.getTestResultText();
    expect(resultText).toBeTruthy();
  });

  test('should handle test execution workflow', async ({ page }) => {
    const exercisePage = new ExercisePage(page);
    const sandpackEditor = new SandpackEditor(page);
    
    await exercisePage.goto('option', 'option-01');
    await exercisePage.waitForLoad();
    await sandpackEditor.waitForLoad();
    
    await expect(sandpackEditor.runTestsButton).toBeEnabled();
    
    await sandpackEditor.runTests();
    
    await expect(sandpackEditor.runTestsButton).toBeDisabled();
    
    await sandpackEditor.waitForTestResults();
    
    await expect(sandpackEditor.runTestsButton).toBeEnabled();
  });

  test('should switch between editor tabs', async ({ page }) => {
    const exercisePage = new ExercisePage(page);
    const sandpackEditor = new SandpackEditor(page);
    
    await exercisePage.goto('option', 'option-01');
    await exercisePage.waitForLoad();
    await sandpackEditor.waitForLoad();
    
    await sandpackEditor.switchToTab('exercise.test.ts');
    
    await page.waitForTimeout(1000);
    
    await sandpackEditor.switchToTab('exercise.ts');
    
    await page.waitForTimeout(1000);
  });

  test('should display different exercise types correctly', async ({ page }) => {
    const exercisePage = new ExercisePage(page);
    const sandpackEditor = new SandpackEditor(page);
    
    await exercisePage.goto('either', 'either-01');
    await exercisePage.waitForLoad();
    await sandpackEditor.waitForLoad();
    
    await expect(exercisePage.exerciseTitle).toContainText('Safe Division');
    await expect(sandpackEditor.editorContainer).toBeVisible();
    
    const tags = await exercisePage.getTagTexts();
    expect(tags).toContain('either');
    expect(tags).toContain('error-handling');
  });
});
