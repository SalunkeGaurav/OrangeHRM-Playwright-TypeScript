import { test } from '../fixtures/test';
import { expect } from '@playwright/test';
import { invalidLoginData } from '../test-data/loginData';

test('verify valid OrangeHRM login', async ({ loginPage }) => {

    await expect(loginPage.loginButton).toBeVisible();

    const dashboardPage = await loginPage.login('Admin', 'admin123');

    await expect(dashboardPage.dashboardText).toBeVisible();

});

for (const data of invalidLoginData) {

    test(`invalid login - ${data.username}`, async ({ loginPage, page }) => {

        await loginPage.login(data.username, data.password);

        await expect(loginPage.invalidCredentialsMessage).toBeVisible();

    });
}