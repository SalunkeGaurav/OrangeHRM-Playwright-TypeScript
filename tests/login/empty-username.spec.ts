import { expect } from '@playwright/test';
import { test } from '../../fixtures/test';

test('Require username when password is provided', async ({ loginPage, page }) => {
  await expect(loginPage.usernameInput).toBeVisible();
  await expect(loginPage.passwordInput).toBeVisible();
  await expect(loginPage.loginButton).toBeVisible();

  await loginPage.passwordInput.fill('invalid-password-for-validation');
  await expect(loginPage.usernameInput).toBeEmpty();

  await loginPage.loginButton.click();

  await expect(page.getByText('Required')).toBeVisible();
  await expect(page).toHaveURL(/\/web\/index\.php\/auth\/login$/);
  await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeHidden();
});
