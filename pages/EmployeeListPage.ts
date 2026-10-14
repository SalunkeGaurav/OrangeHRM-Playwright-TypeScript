
import { Page, Locator, expect } from '@playwright/test';
import { EmployeeDetailsPage } from './EmployeeDetailsPage';

export class EmployeeListPage {
    employeeNameInput: Locator;
    searchButton: Locator;
    searchResults: Locator;

    constructor(private page: Page) {
        this.employeeNameInput = page
            .locator('input[placeholder="Type for hints..."]')
            .first();

        this.searchButton = page.getByRole('button', { name: 'Search' });
        this.searchResults = page.locator('.oxd-table-body');
    }

    async searchByName(firstName: string) {
        await this.employeeNameInput.fill(firstName);
        await this.searchButton.click();
    }

    async openEmployee(firstName: string): Promise<EmployeeDetailsPage> {
        const employeeRow = this.searchResults
            .locator('.oxd-table-row')
            .filter({
                has: this.page.getByRole('cell', {
                    name: firstName,
                    exact: true,
                }),
            });

        await expect(employeeRow).toHaveCount(1);
        await employeeRow.getByRole('cell').nth(2).click();

        const detailsPage = new EmployeeDetailsPage(this.page);

        await expect(detailsPage.firstNameInput).toBeVisible();
        await expect(detailsPage.firstNameInput).toHaveValue(firstName);

        return detailsPage;
    }

    async deleteEmployee(firstName: string) {
    const employeeRow = this.searchResults
        .locator('.oxd-table-row')
        .filter({
            has: this.page.getByRole('cell', {
                name: firstName,
                exact: true,
            }),
        });

    await expect(employeeRow).toHaveCount(1);

    // Delete button is the last button in this employee's row
    await employeeRow.getByRole('button').last().click();

    await this.page.getByRole('button', {
        name: 'Yes, Delete',
    }).click();

}

}
