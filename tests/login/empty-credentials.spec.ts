import { expect } from '@playwright/test';
import { test } from '../../fixtures/test';

test('Require both credentials when submitted empty', async ({ loginPage, page }) => {
  await expect(loginPage.usernameInput).toBeVisible();
  await expect(loginPage.passwordInput).toBeVisible();
  await expect(loginPage.loginButton).toBeVisible();
  await expect(loginPage.usernameInput).toBeEmpty();
  await expect(loginPage.passwordInput).toBeEmpty();

  await loginPage.loginButton.click();

  await expect(page.getByText('Required')).toHaveCount(2);
  await expect(page).toHaveURL(/\/web\/index\.php\/auth\/login$/);
  await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeHidden();
});
