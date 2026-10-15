import { expect } from '@playwright/test';
import { test } from '../../fixtures/test';

test('Require password when username is provided', async ({ loginPage, page }) => {
  await expect(loginPage.usernameInput).toBeVisible();
  await expect(loginPage.passwordInput).toBeVisible();
  await expect(loginPage.loginButton).toBeVisible();

  await loginPage.usernameInput.fill('validation-user');
  await expect(loginPage.usernameInput).toHaveValue('validation-user');
  await expect(loginPage.passwordInput).toBeEmpty();

  await loginPage.loginButton.click();

  await expect(page.getByText('Required')).toBeVisible();
  await expect(page).toHaveURL(/\/web\/index\.php\/auth\/login$/);
  await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeHidden();
});
