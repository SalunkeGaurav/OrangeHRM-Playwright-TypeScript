import { Page, Locator, expect } from '@playwright/test';

export class EmployeeListPage {
    employeeNameInput: Locator;
    searchButton: Locator;
    searchResults: Locator;

    constructor(private page: Page) {
        this.employeeNameInput = page.locator(
            'input[placeholder="Type for hints..."]'
        ).first();
        this.searchButton = page.getByRole('button', { name: 'Search' });
        this.searchResults = page.locator('.oxd-table-body');
    }

    async searchByName(firstName: string) {

        await this.employeeNameInput.fill(firstName);;
        await this.searchButton.click();
    }
}