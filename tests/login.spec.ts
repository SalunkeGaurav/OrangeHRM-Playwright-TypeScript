import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { invalidLoginData } from '../test-data/loginData';

test('verify valid OrangeHRM login', async ({ page }) => {

    await page.goto('/');

    const loginPage = new LoginPage(page);

    await expect(loginPage.loginButton).toBeVisible();

    const dashboardPage = await loginPage.login('Admin', 'admin123');

    await expect(dashboardPage.dashboardText).toBeVisible();

});


for (const data of invalidLoginData) {

    test(`invalid login - ${data.username}`, async ({ page }) => {

        await page.goto('/');

        const loginPage = new LoginPage(page);

        await loginPage.login(data.username, data.password);

        await expect(
            page.getByText('Invalid credentials')
        ).toBeVisible();

    });
}
