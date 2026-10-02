import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test('verify valid OrangeHRM login', async ({ page }) => {

    await page.goto('https://opensource-demo.orangehrmlive.com/');

    const loginPage = new LoginPage(page);

    await expect(loginPage.loginButton).toBeVisible();

    const dashboardPage = await loginPage.login('Admin', 'admin123');

    await expect(dashboardPage.dashboardText).toBeVisible();

});

test('verify login with invalid username', async ({ page }) => {

    await page.goto('https://opensource-demo.orangehrmlive.com/');

    const loginPage = new LoginPage(page);

    await loginPage.login('WrongUser', 'admin123');

    await expect(
        page.getByText('Invalid credentials')
    ).toBeVisible();

});

test('verify login with invalid password', async ({ page }) => {

    await page.goto('https://opensource-demo.orangehrmlive.com/');

    const loginPage = new LoginPage(page);

    await loginPage.login('Admin', 'WrongPassword');

    await expect(
        page.getByText('Invalid credentials')
    ).toBeVisible();

});