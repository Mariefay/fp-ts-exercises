import { Page, Locator, FrameLocator } from '@playwright/test';

export class SandpackEditor {
  readonly page: Page;
  readonly editorContainer: Locator;
  readonly runTestsButton: Locator;
  readonly testResults: Locator;
  readonly loadingIndicator: Locator;
  readonly codeEditor: FrameLocator;

  constructor(page: Page) {
    this.page = page;
    this.editorContainer = page.locator('[class*="sp-"]').first();
    this.runTestsButton = page.locator('button:has-text("Run Tests"), button:has-text("Running Tests...")');
    this.testResults = page.locator('.absolute.top-16.right-4 > div[class*="bg-green-50"], .absolute.top-16.right-4 > div[class*="bg-red-50"]');
    this.loadingIndicator = page.locator('div:has-text("Running tests...") span');
    this.codeEditor = page.frameLocator('iframe[title*="Code Editor"]');
  }

  async waitForLoad() {
    await this.editorContainer.waitFor();
    await this.page.waitForTimeout(2000);
  }

  async runTests() {
    await this.runTestsButton.click();
  }

  async waitForTestResults() {
    await this.testResults.waitFor({ timeout: 15000 });
  }

  async getTestResultText() {
    return await this.testResults.textContent();
  }

  async isTestsPassing() {
    const results = await this.testResults.first();
    const className = await results.getAttribute('class');
    return className?.includes('bg-green-50') || false;
  }

  async isTestsRunning() {
    return await this.loadingIndicator.isVisible();
  }

  async typeInEditor(text: string) {
    const editorTextarea = this.codeEditor.locator('textarea, [contenteditable="true"]').first();
    await editorTextarea.waitFor();
    await editorTextarea.click();
    await editorTextarea.fill(text);
  }

  async getEditorContent() {
    const editorTextarea = this.codeEditor.locator('textarea, [contenteditable="true"]').first();
    return await editorTextarea.inputValue();
  }

  async clearEditor() {
    const editorTextarea = this.codeEditor.locator('textarea, [contenteditable="true"]').first();
    await editorTextarea.waitFor();
    await editorTextarea.click();
    await this.page.keyboard.press('Control+A');
    await this.page.keyboard.press('Delete');
  }

  async switchToTab(tabName: string) {
    await this.page.getByRole('tab', { name: tabName }).click();
  }

  async getVisibleTabs() {
    return await this.page.locator('[role="tab"]').allTextContents();
  }
}
