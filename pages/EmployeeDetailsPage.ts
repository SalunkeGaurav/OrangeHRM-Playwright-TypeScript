
import { Page, Locator, expect } from '@playwright/test';

export class EmployeeDetailsPage {
    firstNameInput: Locator;
    saveButton: Locator;

    constructor(private page: Page) {
        this.firstNameInput = page.locator('input[name="firstName"]');
        this.saveButton = page.locator('button').filter({ hasText: 'Save' }).first()
    }
    
        async updateFirstName(newFirstName: string) {
        await this.firstNameInput.fill(newFirstName);
        await this.saveButton.click();

    }


}
