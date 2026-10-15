import { expect } from '@playwright/test';
import { test } from '../../fixtures/test';

test('Require username for password recovery', async ({ loginPage, page }) => {
  await expect(loginPage.loginButton).toBeVisible();

  await page.getByText('Forgot your password?').click();

  await expect(page).toHaveURL(/\/web\/index\.php\/auth\/requestPasswordResetCode$/);
  await expect(page.getByRole('heading', { name: 'Reset Password' })).toBeVisible();

  const resetUsernameInput = page.getByRole('textbox', { name: 'Username' });
  await expect(resetUsernameInput).toBeEmpty();

  await page.getByRole('button', { name: 'Reset Password' }).click();

  await expect(page.getByText('Required')).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Reset Password' })).toBeVisible();
  await expect(page).toHaveURL(/\/web\/index\.php\/auth\/requestPasswordResetCode$/);
});
