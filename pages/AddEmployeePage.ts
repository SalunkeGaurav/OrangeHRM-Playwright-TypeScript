import { Page, Locator, expect } from '@playwright/test';

export class AddEmployeePage {
    firstNameInput: Locator;
    lastNameInput: Locator;
    saveButton: Locator;
    formLoader: Locator;

    constructor(private page: Page) {
        this.firstNameInput = page.getByRole('textbox', { name: 'First Name' });
        this.lastNameInput = page.getByRole('textbox', { name: 'Last Name' });
        this.saveButton = page.getByRole('button', { name: 'Save' });
        this.formLoader = page.locator('.oxd-form-loader');
    }

    async createEmployee(firstName: string, lastName: string): Promise<void> {
        await expect(this.firstNameInput).toBeVisible();
        await expect(this.lastNameInput).toBeVisible();
        await expect(this.formLoader).toBeHidden();
        await expect(this.saveButton).toBeEnabled();

        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await Promise.all([
        this.page.waitForURL(
            /\/pim\/viewPersonalDetails\/empNumber\/\d+/
        ),
        this.saveButton.click(),
]);

}
}