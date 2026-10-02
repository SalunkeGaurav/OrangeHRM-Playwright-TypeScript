import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';

test('verify valid OrangeHRM login', async ({ page }) => {

    await page.goto('https://opensource-demo.orangehrmlive.com/');

    const loginPage = new LoginPage(page);

    await expect(loginPage.loginButton).toBeVisible();

    await loginPage.login('Admin', 'admin123');

    const dashboardPage = new DashboardPage(page);
    await expect(dashboardPage.dashboardText).toBeVisible();

});