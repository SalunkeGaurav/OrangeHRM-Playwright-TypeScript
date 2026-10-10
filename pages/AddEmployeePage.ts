import { Page, Locator } from '@playwright/test';

export class AddEmployeePage {
    firstNameInput: Locator;
    lastNameInput: Locator;
    employeeIdInput: Locator;
    saveButton: Locator;

    constructor(private page: Page) {
        this.firstNameInput = page.getByRole('textbox', { name: 'First Name' });
        this.lastNameInput = page.getByRole('textbox', { name: 'Last Name' });
        this.employeeIdInput = page.locator('input').nth(4);
        this.saveButton = page.getByRole('button', { name: 'Save' });
    }

    async createEmployee(firstName: string, lastName: string) {
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