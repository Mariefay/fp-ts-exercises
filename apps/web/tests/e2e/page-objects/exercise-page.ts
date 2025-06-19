import { Page, Locator } from '@playwright/test';

export class ExercisePage {
  readonly page: Page;
  readonly backLink: Locator;
  readonly difficultyBadge: Locator;
  readonly estimatedTime: Locator;
  readonly completedIndicator: Locator;
  readonly offlineIndicator: Locator;
  readonly exerciseTitle: Locator;
  readonly goalStatement: Locator;
  readonly conceptExplanation: Locator;
  readonly hints: Locator;
  readonly tags: Locator;
  readonly sandpackEditor: Locator;
  readonly successCriteria: Locator;

  constructor(page: Page) {
    this.page = page;
    this.backLink = page.locator('a[href*="/exercises/"]').first();
    this.difficultyBadge = page.locator('[class*="difficulty"]').first();
    this.estimatedTime = page.getByText(/\d+ min/);
    this.completedIndicator = page.getByText('Completed');
    this.offlineIndicator = page.getByText('Offline Mode');
    this.exerciseTitle = page.locator('h1');
    this.goalStatement = page.locator('p').first();
    this.conceptExplanation = page.locator('[class*="bg-primary-50"]');
    this.hints = page.locator('[class*="collapsible"]');
    this.tags = page.locator('[class*="bg-accent-100"]');
    this.sandpackEditor = page.locator('[class*="sp-"]').first();
    this.successCriteria = page.locator('[class*="bg-success-50"]');
  }

  async goto(category: string, slug: string) {
    await this.page.goto(`/exercises/${category}/${slug}`);
  }

  async waitForLoad() {
    await this.exerciseTitle.waitFor();
    await this.sandpackEditor.waitFor();
  }

  async clickBackLink() {
    await this.backLink.click();
  }

  async getTagTexts() {
    return await this.tags.allTextContents();
  }

  async isCompleted() {
    return await this.completedIndicator.isVisible();
  }

  async isOffline() {
    return await this.offlineIndicator.isVisible();
  }
}
