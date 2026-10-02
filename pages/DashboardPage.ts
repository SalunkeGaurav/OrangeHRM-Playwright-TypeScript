import { Page, Locator } from '@playwright/test';

export class DashboardPage {
  dashboardText: Locator;

  constructor(private page: Page) {
    this.dashboardText = page.getByText('Dashboard').first();
  }

  async isDashboardDisplayed(): Promise<boolean> {
    return this.dashboardText.isVisible();
  }
}