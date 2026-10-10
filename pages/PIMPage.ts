import { Page, Locator } from '@playwright/test';
import { AddEmployeePage } from './AddEmployeePage';
import { EmployeeListPage } from './EmployeeListPage';

export class PIMPage {
    addEmployeeButton: Locator;
    employeeListLink: Locator;

    constructor(private page: Page) {
        this.addEmployeeButton = page.getByRole('link', { name: 'Add Employee' });
        this.employeeListLink = page.getByRole('link', {name: 'Employee List'});
    }

    async goToAddEmployee(): Promise<AddEmployeePage> {
        await this.addEmployeeButton.click();
        return new AddEmployeePage(this.page);
    }

    async goToEmployeeList(): Promise<EmployeeListPage> {
    await this.employeeListLink.click();
    return new EmployeeListPage(this.page);
    }
}