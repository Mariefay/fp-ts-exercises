import { Page, Locator } from '@playwright/test';

export class ExerciseCategoriesPage {
  readonly page: Page;
  readonly heading: Locator;
  readonly description: Locator;
  readonly categoryCards: Locator;
  readonly backToDashboardLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heading = page.getByRole('heading', { name: 'Exercise Categories' });
    this.description = page.getByText('Choose a category to start learning');
    this.categoryCards = page.locator('a[href^="/exercises/"][class*="card-hover"]');
    this.backToDashboardLink = page.getByRole('link', { name: '← Back to Dashboard' });
  }

  async goto() {
    await this.page.goto('/exercises');
  }

  async clickCategory(categorySlug: string) {
    await this.page.getByRole('link', { name: new RegExp(categorySlug, 'i') }).first().click();
  }

  async getCategoryCard(categorySlug: string) {
    return this.page.locator(`[href="/exercises/${categorySlug}"]`);
  }

  async getCategoryTitle(categorySlug: string) {
    const card = await this.getCategoryCard(categorySlug);
    return card.locator('h3');
  }

  async getCategoryDescription(categorySlug: string) {
    const card = await this.getCategoryCard(categorySlug);
    return card.locator('p').first();
  }

  async getCategoryExerciseCount(categorySlug: string) {
    const card = await this.getCategoryCard(categorySlug);
    return card.locator('[class*="bg-primary-100"]');
  }

  async waitForLoad() {
    await this.heading.waitFor();
    await this.categoryCards.first().waitFor();
  }
}
