
import { test } from '../fixtures/test';
import { expect } from '@playwright/test';
import { employeeData } from '../test-data/employeeData';

test('create employee and verify in employee list', async ({ loginPage, page }) => {
    
    const dashboardPage = await loginPage.login(
        process.env.ORANGEHRM_USERNAME!,
        process.env.ORANGEHRM_PASSWORD!
    );

    const pimPage = await dashboardPage.goToPIM();
    const addEmployeePage = await pimPage.goToAddEmployee();

    await addEmployeePage.createEmployee(
        employeeData.firstName,
        employeeData.lastName
    );

    // Verify employee creation
    await expect(page).toHaveURL(
        /\/pim\/viewPersonalDetails\/empNumber\/\d+/
    );

    const employeeListPage = await pimPage.goToEmployeeList();

    await employeeListPage.searchByName(employeeData.firstName);

    // Verify employee appears in results
    await expect(
        employeeListPage.searchResults.getByText(
            employeeData.firstName,
            { exact: true }
        )
    ).toBeVisible();
});
