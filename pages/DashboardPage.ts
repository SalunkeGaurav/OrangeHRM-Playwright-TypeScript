import { Page, Locator } from '@playwright/test';
import { PIMPage } from './PIMPage';

export class DashboardPage {
    dashboardText: Locator;
    pimMenu: Locator;

   constructor(private page: Page) {
    this.dashboardText = page.getByText('Dashboard').first();
    this.pimMenu = page.getByRole('link', { name: 'PIM' });
}

    async goToPIM(): Promise<PIMPage> {
        await this.pimMenu.click();
        return new PIMPage(this.page);
    }

    async isDashboardDisplayed(): Promise<boolean> {
        return this.dashboardText.isVisible();
    }
}