
import { test } from '../../fixtures/test';
import { expect } from '@playwright/test';
import { createEmployeeData } from '../../test-data/employeeData';
import process from 'process';

test('create employee and verify in employee list', async ({ loginPage, page }) => {

    const employee = createEmployeeData();
    
    const dashboardPage = await loginPage.login(
        process.env.ORANGEHRM_USERNAME!,
        process.env.ORANGEHRM_PASSWORD!
    );

    const pimPage = await dashboardPage.goToPIM();
    const addEmployeePage = await pimPage.goToAddEmployee();

    await addEmployeePage.createEmployee(
        employee.firstName,
        employee.lastName
    );

    const employeeListPage = await pimPage.goToEmployeeList();

    await employeeListPage.searchByName(employee.firstName);

    // Verify employee appears in results
    await expect(
        employeeListPage.searchResults.getByText(
            employee.firstName,
            { exact: true }
        )
    ).toBeVisible();
});


test('update employee first name', async ({ loginPage, page }) => {
    const employee = createEmployeeData();

    const dashboardPage = await loginPage.login(
        process.env.ORANGEHRM_USERNAME!,
        process.env.ORANGEHRM_PASSWORD!
    );

    const pimPage = await dashboardPage.goToPIM();
    const addEmployeePage = await pimPage.goToAddEmployee();

    // Create test data specifically for this test
    await addEmployeePage.createEmployee(
        employee.firstName,
        employee.lastName
    );

    // Navigate to Employee List and search for this same employee
    const employeeListPage = await pimPage.goToEmployeeList();
    await employeeListPage.searchByName(employee.firstName);

    const employeeDetailsPage = await employeeListPage.openEmployee(
        employee.firstName
    );

    const updatedFirstName = `${employee.firstName}Updated`;

    await employeeDetailsPage.updateFirstName(updatedFirstName);

    await expect(
            page.getByText('Successfully Updated', { exact: false })
        ).toBeVisible();

    const updatedEmployeeListPage = await pimPage.goToEmployeeList();

    await updatedEmployeeListPage.searchByName(updatedFirstName);

    // Verify the employee appears in the results
    await expect(
        updatedEmployeeListPage.searchResults.getByText(
            updatedFirstName,
            { exact: true }
        )
    ).toBeVisible();

});

test('delete employee and verify success message', async ({ loginPage, page }) => {
    const employee = createEmployeeData();

    const dashboardPage = await loginPage.login(
        process.env.ORANGEHRM_USERNAME!,
        process.env.ORANGEHRM_PASSWORD!
    );

    const pimPage = await dashboardPage.goToPIM();
    const addEmployeePage = await pimPage.goToAddEmployee();

    await addEmployeePage.createEmployee(
        employee.firstName,
        employee.lastName
    );

    const employeeListPage = await pimPage.goToEmployeeList();
    await employeeListPage.searchByName(employee.firstName);

    await employeeListPage.deleteEmployee(employee.firstName);

    await expect(
        page.getByText('Successfully Deleted', { exact: false })
    ).toBeVisible();
});